var socket = io();

$('#accept').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  // Emit a message to accept the current name
  socket.emit('accept name', 'Valid');

  // Disable form after first submission
  $('form').unbind('accept');
  $('form').accept(function(e){ e.preventDefault(); });
});

$('#decline').click(function(e){
  // Prevent JavaScript from doing normal functionality
  e.preventDefault();

  // Emit a message to decline the current name
  socket.emit('decline name', 'Invalid');

  // Disable form after first submission
  $('form').unbind('decline');
  $('form').decline(function(e){ e.preventDefault(); });
});
