var socket = io();

$('form').submit(function(e){
    e.preventDefault();
    socket.emit('verify name', $('#name').val());
    
    // Remove form and replace with "Thanks" message
    $('form').remove();
    $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
});

socket.on('blacklisted name', function(msg){
  // Display error notification
  errorNotify();

  // Remove name from textbox
  $('#name').empty();
});


function errorNotify()
{
  var error = $('<div>')
    .addClass('errorNotification')
    .text('Error: Name was not accepted')
    .append(
      $('<div>')
        .addClass('exitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}
