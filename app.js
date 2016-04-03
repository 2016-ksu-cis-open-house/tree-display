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

    t = data.split("\r\n");
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

  // Run this function when the "verify name" channel recieves an entry
  socket.on('verify name', function(msg){
    // Send start message to console
    console.log('Attempting to add name ' + msg);

    // Create variables to assess the validity of the name
    var nameElements = msg.split(" ");
    var nameOnWhiteList = false;
    var nameOnBlackList = false;
    var nameScore = 0; // Use this to verify that all of the words are valid

    // Verify that all of the separate words in the name are on the whitelist
    var i;
    var numElements = nameElements.length;

    for(i = 0; i < numElements; i++)
    {
      if(white_list.has(nameElements[i].toLowerCase()))
      {
        nameScore += 1;
        console.log('The word ' + nameElements[i] + ' is on the whitelist');
      }
    }

    if(nameScore == nameElements.length)
    {
      console.log('All of the elements of the name are in the whitelist');

      nameOnWhiteList = true;

      // Send the name to the tree
      io.emit('add name', msg)

      console.log('The name ' + msg + ' is on the whitelist');
    }

    // Verify that the name as a whole is on the blacklist
    if (black_list.has(msg.toLowerCase())) {
       // TODO: Create GUI based warning/handling system
       //alert(socket.handshake.address + " entered a bad name");

       nameOnBlackList = true;

       console.log('The word ' + msg + ' is on the blacklist');
    }

    // Verify that the name is not on either list
    if(!nameOnWhiteList && !nameOnBlackList)
    {
      // Send the name to the moderator to verify
      io.emit('moderate name', msg)

      console.log('The name ' + msg + ' was sent to the moderator');
    }
  });

  // Send the name to the tree
  socket.on('add name', function(msg){
    // Deserialize parameter
    var nameInfo = JSON.parse(msg);

    // Check if the name is accepted by the moderator
    if(nameInfo[1])
    {

      // Add the various words in the name to the whitelist
      addWhitelistName(name);

      // Add the current name to the list of names
      names.append(msg);
    }
    else
    {
      // Add the name to the blacklist
      black_list.append(nameElements[i]);
    }
  });
});

function addWhitelistName(name)
{
  var nameElements = name.split(" ");
  var i;
  var numEleNames = nameElements.length;

  // Go through all of the words in the name
  for(i = 0; i < numEleNames; i++)
  {
    // Verify whether the word is greater than 3 characters
    var word = nameElements[i];
    if(word.length > 2)
    {
      // Add the current word to the whitelist
      white_list.add(word.toLowerCase());
    }
  }
}

http.listen(3000, function(){
  console.log('Listening on port 3000!');
});
