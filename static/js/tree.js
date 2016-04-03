var socket = io();

// Handle adding a name to the tree
socket.on('add name', function(msg){
  $('#names').append($('<li>').text(msg));
});
