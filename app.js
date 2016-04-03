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

  // Handle when the user sends a name to be verified
  socket.on('verify name', function(msg){
    console.log('Attempting to add name ' + msg);

    // Create variables to assess the validity of the name
    var nameElements = msg.split(" ");
    var nameOnWhiteList = false;
    var nameOnBlackList = false;
    var nameScore = 0;

    // Verify that all of the separate words in the name are
    // on the whitelist
    var i;
    var numElements = nameElements.length;

    for(i = 0; i < numElements; i++)
    {
      if(white_list.has(nameElements[i].toLowerCase()))
      {
        nameScore += 1;
      }
    }

    if(nameScore == nameElements.length)
    {
      nameOnWhiteList = true;

      // Update the tree and thank the user
      endUserInteraction(msg);

      console.log('The name ' + msg + ' is on the whitelist');
    }

    // Verify that the name as a whole is on the blacklist
    if (black_list.has(msg.toLowerCase())) {
      // Show unaccepted name notification
      io.emit('blacklisted name', msg);

      nameOnBlackList = true;

      console.log('The word ' + msg + ' is on the blacklist');
    }

    // Verify that the name is not on either list
    if(!nameOnWhiteList && !nameOnBlackList)
    {
      // Send the name to the moderator to verify
      io.emit('moderate name', msg);

      console.log('The name ' + msg + ' was sent to the moderator');
    }
  });

  // Submit the name to be added to the proper lists and/or the tree
  socket.on('submit name info', function(msgInfo){
    // Deserialize parameter
    var nameInfo = JSON.parse(msgInfo);
    var name = nameInfo[0];

    // Check if the name was accepted by the moderator
    if(nameInfo[1])
    {
      console.log('The name ' + name + ' has been whitelisted');

      // Add the various words in the name to the whitelist
      whitelistName(name);

      // Update the tree and thank the user
      endUserInteraction(name);
    }
    else
    {
      console.log('The name ' + name + ' has been blacklisted');

      // Add the name to the blacklist
      black_list.add(name);
    }
  });

  // Send the name to the tree
  socket.on('add name', function(msg){
    // Add the current name to the list of names
    names.push(word);
  });
});

// Add the words in the provided name to the whitelist
function whitelistName(name)
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

// End the interaction that the current user has with the program
function endUserInteraction(name)
{
  // Push the name to the tree
  io.emit('add name', name);

  // Show the thank you message
  io.emit('thank you');
}

http.listen(3000, function(){
  console.log('Listening on port 3000!');
});
