var socket = io();
var nameInfo = {"name":"", "accepted":""};

// Get the name from the server and put on the form for
// the moderator to approve
socket.on('moderate name', function(msg){
  // Update the variable on the form for the current name
  $('#currentName').text(msg);

  // Put the current name in the data to be transmitted
  nameInfo.name = $('#currentName').text();
});



// Moderator accepts the current name
$('#accept').click(function(e){

  console.log('The name ' + $('#currentName').text() + ' has been accepted');

  // Input whether the name is valid
  nameInfo.action = "accepted";

  // Emit a message to accept the current name
  socket.emit('submit name info', nameInfo);

  // Action after form is submitted
  $('#currentName').empty();
});



// Moderator declines the current name
$('#decline').click(function(e){

  console.log('The name ' + $('#currentName').text() + ' has been denied');

  // Input whether the name is valid
  nameInfo.action = "declined";

  // Emit a message to accept the current name
  socket.emit('submit name info', nameInfo);

  // Action after form is submitted
  $('#currentName').empty();
});
