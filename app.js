var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('static'));
app.set('view engine', 'jade');

var names = [];

app.get('/', function (req, res){
  res.render('index');
});

app.get('/tree', function (req, res){
  res.render('tree', {names: names});
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('add name', function(msg){
    names.push(msg);
    io.emit('add name', msg)
  });
});

http.listen(3000, function(){
  console.log('Listening on port 3000!');
});
