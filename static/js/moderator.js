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

$('form').delete(function(e){
  e.preventDefault();
  socket.emit('Delete');
  // Disable form after first submission
  $('form').unbind('delete element', 'delete');
  $('form').delete(function(e){ e.preventDefault(); });
});

$('form').clear(function(e){
  e.preventDefault();
  socket.emit('clear tree', 'Clear');
  // Disable form after first submission
  $('form').unbind('clear');
  $('form').clear(function(e){ e.preventDefault(); });
});
