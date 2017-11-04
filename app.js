const express = require('express');
const path = require('path');
const sql = require('mysql');
const bodyParser = require('body-parser');

var app = express();

var sqlConnect = sql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'artical'
});

sqlConnect.connect(function(error) {
    if (error) throw error;
    console.log('connect !!!');
    console.log('connected as id ' + sqlConnect.threadId);
})

app.set('View', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.send('hello world!!');
})

app.get('/artical/add', function(res, rep) {
    rep.render('add_Artical');
})

app.post('/artical/add', function(res, rep) {
    console.log(res.body);
    var insertSQL = "INSERT INTO artical.table (name, description) VALUES ?";
    var data = [];
    data.push(res.body.title);
    data.push(res.body.body);
    var ress = [];
    ress.push(data);
    sqlConnect.query(insertSQL, [ress], function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log('result :: ' + result.affectedRows);
            rep.redirect('/');
        }
    })
    return;
})

app.get('/artical', function(request, response) {
    //sqlConnect.connect(function(err) {
        //if (err) throw err
        //console.log('You are now connected...')

        sqlConnect.query('SELECT * FROM artical.table', function(err, res) {
            if (err) throw err
            response.render('index', {
                title: 'Nodejs',
                message: res
            });
        })
    //})
})

app.listen(5000, function() {
    console.log('listening to port 5000 ....');
})