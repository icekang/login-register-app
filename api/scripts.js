$(document).ready(function() {
    var userapi = 'localhost/user'
    $.getJSON(userapi, function(data) {
        console.log(data)
        if (data) {
            $('#input-firstname').val(data.firstname)
            $('#input-lastname').val(data.lastname)
        } else {
        }
    })
})
