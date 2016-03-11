var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var sets = require('simplesets');

app.use(express.static('static'));
app.set('view engine', 'jade');

var names = [];

// Initialize whitelist and black list
var white_list = new sets.Set();
load_file(white_list, 'special_names/whitelist.txt');
var black_list = new sets.Set();
load_file(black_list, 'special_names/blacklist.txt');

function load_file(s, file) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    t = data.split("\n");
    for (var i = 0; i < t.length; i++) {
      s.add(t[i].toLowerCase());
    }
    console.log("Finished loading " + file);
  });
};


app.get('/', function (req, res){
  res.render('index');
});

app.get('/tree', function (req, res){
  res.render('tree', {names: names});
});

app.get('/moderator', function (req, res){
  res.render('moderator', {names: names});
});

io.on('connection', function(socket){
  console.log('A user connected from: ' + socket.handshake.address);
  socket.on('add name', function(msg){
    console.log('Attempting to add name ' + msg);
    if (black_list.has(msg.toLowerCase())) {
       // TODO: Warn client
       console.log(socket.handshake.address + " entered a bad name");
       return "Bad name";
    }
    // TODO: White list
    names.push(msg);
    io.emit('add name', msg)
  });
});

http.listen(3000, function(){
  console.log('Listening on port 3000!');
});
