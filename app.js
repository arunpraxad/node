const express = require('express');

var app = express();

app.get('/', function(request, response) {
    response.send('HI, Node Js!!');
})

app.listen(5000, function() {
    console.log('listening to port 5000 ....');
})