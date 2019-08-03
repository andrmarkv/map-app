var express = require('express');
var app = express();

var server = require('http').Server(app);

server.listen(8000);

//UDP Socket parameters to communicate with GPS simulator
var PORT = 8001;
var HOST = '127.0.0.1';

//UDP Socket parameters to communicate with Control server
var PORT2 = 8002;
var HOST2 = '127.0.0.1';






app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

