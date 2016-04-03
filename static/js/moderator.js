var socket = io();
//var verifyNameFormState = false;

socket.on('moderate name', function(msg){
    $('#currentName').text(msg);
});

$('#accept').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  // Serialize the name and whether the name is valid
  var nameInfo = JSON.stringify([$('#currentName').text(), true]);

  // Emit a message to accept the current name
  socket.emit('add name', nameInfo);

  // Disable form after first submission
  $('form').unbind('accept');
  $('form').accept(function(e){ e.preventDefault(); });
});

$('#decline').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  // Serialize the name and whether the name is valid
  var nameInfo = JSON.stringify([$('#currentName').text(), false]);

  // Emit a message to accept the current name
  socket.emit('add name', nameInfo);

  // Disable form after first submission
  $('form').unbind('decline');
  $('form').decline(function(e){ e.preventDefault(); });
});
