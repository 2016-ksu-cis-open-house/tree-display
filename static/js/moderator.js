var socket = io();
//var verifyNameFormState = false;

socket.on('moderate name', function(msg){
  $('#currentName').text(msg);
});

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
