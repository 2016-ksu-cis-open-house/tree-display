var socket = io();

// Handle when the user submits a name to the tree
$('form').submit(function(e){
  e.preventDefault();

  // Send the name to the server to be verified as appropriate
  socket.emit('verify name', $('#name').val());
});

// Handle when the user enters an inappropriate name
socket.on('blacklisted name', function(msg){
  // Display error notification
  errorNotify();

  // Remove name from textbox
  $('#name').empty();
});

// Handle the end of the interaction between the user and the tree
socket.on('thank you', function(){
  // Remove form
  $('form').remove();

  // Display a form that thanks the user
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
});

// Create an error banner
function errorNotify()
{
  // Create the banner
  var error = $('<div>')
    .addClass('errorNotification')
    .text('Error: Name was not accepted')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('exitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}
