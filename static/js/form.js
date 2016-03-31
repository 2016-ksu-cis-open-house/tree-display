var socket = io();

$('form').submit(function(e){
    e.preventDefault();
    socket.emit('verify name', $('#name').val());
    
    // Remove form and replace with "Thanks" message
    $('form').remove();
    $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
});
