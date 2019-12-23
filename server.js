// include package
var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')

// connect to mysql database
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    port: 3306,
    user: 'ba7d83fe088eec',
    password: '69a7476b',
    database: 'heroku_6df3c8ebd5bdc40'
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
app.get('/user-info', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/user-info.html'))
    } else {
        response.send('Login first ja')
    }
})
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!')
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})
app.get('/register', function(request, response) {
    response.sendFile(path.join(__dirname + '/register.html'))
})
app.get('/user', function(request, response) {
    if (request.session.loggedin) {
        connection.query('SELECT * FROM user WHERE username = ?', [request.session.username], function(
            error,
            results,
            fields
        ) {
            if (results) {
                // var rows = JSON.parse(JSON.stringify(results[0]))
                // console.log(rows.firstname)
                // var firstname = rows.firstname
                // var lastname = rows.lastname
                response.send(results[0])
                // response.status(200).send(`Yay\nfirstname: ${firstname}\nlastname: ${lastname}\n`)
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
                    response.redirect('/user-info')
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
app.post('/uinfo', function(request, response) {
    if (!request.session.loggedin) {
        response.send('please login first')
    } else {
        var query = 'UPDATE user '
        var vars = []
        var password = request.body.password
        var confirm_password = request.body.confirm_password
        var firstname = request.body.firstname
        var lastname = request.body.lastname
        let isValidPassword = password && confirm_password && password === confirm_password
        let isFirst = true
        if (firstname || lastname || isValidPassword) {
            query += 'SET '
            if (isValidPassword) {
                if (!isFirst) {
                    query += ', '
                } else isFirst = false
                query += 'password = ?'
                vars.push(password)
            }
            if (firstname) {
                if (!isFirst) {
                    query += ', '
                } else isFirst = false
                query += 'firstname = ?'
                vars.push(firstname)
            }
            if (lastname) {
                if (!isFirst) {
                    query += ', '
                } else isFirst = false
                query += 'lastname = ?'
                vars.push(lastname)
            }
            query += ' WHERE username = ?'
            vars.push(request.session.username)
            connection.query(query, vars, function(error, results, fields) {
                response.send(results)
            })
        } else {
            response.send('Please enter someting')
        }
    }
})
app.post('/reg', function(request, response) {
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var username = request.body.username
    var password = request.body.password
    var vars = [firstname, lastname, username, password]
    query =
        'INSERT INTO user (firstname, lastname, username, password) values(?, ?, ?, \
            aes_encrypt(?,UNHEX(SHA2("abracradrabra",512))) \
        )'
    connection.query(query, vars, function(error, results, fields) {
        if (results) {
            request.session.loggedin = true
            request.session.username = username
            response.send(results)
        } else {
            response.send('Username is invalid, please choose another username')
        }
    })
})
port = process.env.PORT || 3000
app.listen(port)
console.log('login-register-app is started on: ' + port)
