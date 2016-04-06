var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var sets = require('simplesets');

app.use(express.static('static'));
app.set('view engine', 'jade');

// Create a set to hold the names added to the tree
var names = new sets.Set();

// TODO: Create a queue of dictionaries(name: socket) to
// collect the names to be moderated

// Initialize whitelist and black list
var white_list = new sets.Set();
load_file(white_list, 'special_names/whitelist.txt');
var black_list = new sets.Set();
load_file(black_list, 'special_names/blacklist.txt');

// Load the given file and put the content into the given set
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

// Handle when a person goes to the index page
app.get('/', function (req, res){
  res.render('index');
});

// Handle when someone goes to the tree page
app.get('/tree', function (req, res){
  res.render('tree', {names: names});
});

// Handle when someone goes to the moderator page
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
    var nameScore = 0;
    var nameInfo = {"name":"", "accepted":""};
    nameInfo['name'] = msg;
    nameInfo['action'] = "denied";

    // TODO: Inform the user that their name is already on the tree
    // Inform the user that their name is already on the tree
    // or (TODO) on the queue of names for the moderator
    if(names.has(msg))
    {
      // Update the tree and thank the user
      nameInfo['action'] = "duplicate";

      socket.emit('end interaction', nameInfo);

      console.log('The name ' + msg + ' is a duplicate');

      return;
    }

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
      // Update the tree and thank the user
      nameInfo['action'] = "accepted";

      socket.emit('end interaction', nameInfo);

      // Add the current name to the list of names
      names.add(msg);

      // Push the name to the tree
      socket.emit('add name', msg);

      console.log('The name ' + msg + ' is on the whitelist');

      return;
    }

    // Verify that the name as a whole is on the blacklist
    if (black_list.has(msg.toLowerCase())) {
      // Update the tree and thank the user
      nameInfo['action'] = "declined";

      socket.emit('end interaction', nameInfo);

      console.log('The word ' + msg + ' is on the blacklist');

      return;
    }

    // TODO: Send the name to a queue

    // Send the name to the moderator to verify
    io.emit('moderate name', msg);

    console.log('The name ' + msg + ' was sent to the moderator');
  });

  // TODO: Add functionality to give the moderator a name when asked

  // Submit the name to be added to the proper lists and/or the tree
  socket.on('submit name info', function(msgInfo){
    // Get the name from the parameter
    var name = msgInfo['name'];

    // Check if the name was accepted by the moderator
    if(msgInfo['action'] == 'accepted')
    {
      // Add the various words in the name to the whitelist
      whitelistName(name);

      // Add the current name to the list of names
      names.add(msg);

      // Push the name to the tree
      socket.emit('add name', name);

      console.log('The name ' + name + ' has been whitelisted');
    }
    else
    {
      // Add the name to the blacklist
      black_list.add(name);

      // TODO: Display the error notification to the user

      console.log('The name ' + name + ' has been blacklisted');
    }

    // Update the tree and thank the user
    socket.emit('end interaction', msgInfo);
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

http.listen(3000, function(){
  console.log('Listening on port 3000!');
});
