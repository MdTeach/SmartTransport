const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const server = require('http').Server(app);
const socket = require('socket.io');


// mongodb connection
mongoose.connect("mongodb://localhost:27017/hackathon");
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


//manage the sockets
var io = socket(server);
io.on('connection', function (socket) {
    console.log("Connected sucessfully");
    socket.on('msg', (data)=>{
        console.log(data["msg"]);
    });
});

// include routes
var routes = require('./routes/index');
var home_routes = require('./routes/home');
app.use(routes);
app.use(home_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});
  
// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//192.168.100.1
server.listen(80,'192.168.100.25',()=>{
    console.log("Listening at port 80");
})

var io = socket(server);
io.on('connection', function (socket) {
    console.log("Connected sucessfully");
    socket.on('msg', (data)=>{
        io.emit("data", {msg:data});
        console.log(data["msg"]);
    });
    socket.on('msg1', (data)=>{
        io.emit("data1", {msg1:data});
        console.log(data["msg1"]+"Rotation");
    });
});

