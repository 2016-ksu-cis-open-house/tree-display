var socket = io();

// Handle when the user submits a name to the tree
$('form').submit(function(e){
  e.preventDefault();

  // Send the name to the server to be verified as appropriate
  socket.emit('verify name', $('#name').val());

  // Remove error banner from form
  $('.errorNotification').remove();
});

// Handle the success or failure of the user entry
socket.on('end interaction', function(msgResponse){
  // Get the user's name and acceptability
  var name = msgResponse['name'];

  // Handle duplicate name
  if(msgResponse['action'] == 'duplicate')
  {
    duplicateName();
  }
  // Handle success
  else if(msgResponse['action'] == 'accepted')
  {
    acceptName();
  }
  // Handle failure
  else
  {
    denyName();
  }
});

function duplicateName()
{
  // Remove form
  $('form').remove();

  // Display a form that thanks the user
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));

  // Show duplicate name notification
  duplicateNotify();
}

// Hande actions when the name is accepted
function acceptName()
{
  // Remove form
  $('form').remove();

  // Display a form that thanks the user
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
}

// Handle actions when the name is denied
function denyName()
{
  // Display error notification
  errorNotify();

  // Remove name from textbox
  $('#name').val('');
}

// Create an error banner
function duplicateNotify()
{
  // Create the banner
  var dup = $('<div>')
    .addClass('duplicateNotification')
    .text('Your name is already on the tree! Try to find it!')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('dExitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}

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
        .addClass('eExitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}
