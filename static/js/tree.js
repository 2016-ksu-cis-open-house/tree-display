var socket = io();

// Add a name to the tree
socket.on('add name', function(msg){
  $('#names').append($('<li>').text(msg));
});
