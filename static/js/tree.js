var socket = io();
socket.on('add name', function(msg){
  $('#names').append($('<li>').text(msg));
});
