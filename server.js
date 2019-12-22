// include package
var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')

// connect to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'mysql-db'
})
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message)
    }

    console.log('Connected to the MySQL server.')
})
// express is for web-application!
app = express()
// tell express what packages we are using
app.use(
    session({
        secret: 'abracadabra', //used for hase function
        resave: true,
        saveUninitialized: true
    })
)

// used to extract data from login.html
//extended is for nested post
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// display login.html, when in /
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'))
})
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!')
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})
app.get('/user', function(request, response) {
    if (request.session.loggedin) {
        connection.query('SELECT * FROM user WHERE username = ?', [request.session.username], function(
            error,
            results,
            fields
        ) {
            if (results) {
                var rows = JSON.parse(JSON.stringify(results[0]))
                console.log(rows.firstname)
                var firstname = rows.firstname
                var lastname = rows.lastname
                response.status(200).send(`Yay\nfirstname: ${firstname}\nlastname: ${lastname}\n`)
                return
            } else {
                console.log("can't find this username on Database!")
                response.status(200).send('an error occurs, please check back in a minute')
                return
            }
        })
    } else {
        response.status(200).send('You shall not pass!')
        response.end()
        return
    }
})
app.post('/auth', function(request, response) {
    var username = request.body.username
    var password = request.body.password
    if (username && password) {
        //if have username and password
        connection.query(
            'SELECT * FROM user WHERE username = ? AND password = aes_encrypt(?,UNHEX(SHA2("abracradrabra",512)))',
            [username, password],
            function(error, results, fields) {
                if (results && results.length > 0) {
                    // create 2 session variables
                    request.session.loggedin = true
                    request.session.username = username
                    response.redirect('/home')
                } else {
                    response.send('Incorrect Username and/or Password!')
                }
                response.end()
            }
        )
    } else {
        //either not enter username or password
        response.send('Please enter Username and Password!')
        response.end()
    }
})

port = process.env.PORT || 3000
app.listen(port)
console.log('login-register-app is started on: ' + port)
