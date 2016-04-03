var socket = io();

// Get the name from the server and put on the form for
// the moderator to approve
socket.on('moderate name', function(msg){
  $('#currentName').text(msg);
});

// Handle when the moderator accepts the current name
$('#accept').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  console.log('The name ' + $('#currentName').text() + ' has been accepted');

  // Serialize the name and whether the name is valid
  var nameInfo = JSON.stringify([$('#currentName').text(), true]);

  // Emit a message to accept the current name
  socket.emit('submit name info', nameInfo);

  // Action after form is submitted
  $('#currentName').empty();
});

// Handle when the moderator declines the current name
$('#decline').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  console.log('The name ' + $('#currentName').text() + ' has been denied');

  // Serialize the name and whether the name is valid
  var nameInfo = JSON.stringify([$('#currentName').text(), false]);

  // Emit a message to accept the current name
  socket.emit('submit name info', nameInfo);

  // Action after form is submitted
  $('#currentName').empty();
});
