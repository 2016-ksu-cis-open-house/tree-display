var socket = io();

$('form').accept(function(e){
  e.preventDefault();
  socket.emit('accept name', 'Valid');
  // Disable form after first submission
  $('form').unbind('accept');
  $('form').accept(function(e){ e.preventDefault(); });
});

$('form').decline(function(e){
  e.preventDefault();
  socket.emit('decline name', 'Invalid');
  // Disable form after first submission
  $('form').unbind('decline');
  $('form').decline(function(e){ e.preventDefault(); });
});
