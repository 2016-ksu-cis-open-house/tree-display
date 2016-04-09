var socket = io();

// Handle when the user submits a name to the tree
$('form').submit(function(e) {
  e.preventDefault();

  // Send the name to the server to be verified as appropriate
  socket.emit('verify name', $('#name').val());

  // Remove any notifications from the form
  S('.duplicateNotification').remove();
  $('.errorNotification').remove();
  S('.illegalNotification').remove();
  S('.waitNotification').remove();
});

// Handle the success or failure of the user entry
socket.on('end interaction', function(msgResponse){
  // Get the user's name and acceptability
  var name = msgResponse['name'];

  // Handle duplicate name
  if( msgResponse['action'] == 'duplicate' ) {
    duplicateName();
  }

  else if(msgResponse['action'] == 'accepted') {
    acceptName();
  }

  else if(msgResponse['action'] == 'illegal') {
    illegalName();
  }

  else if(msgResponse['action'] == 'declined') {
    denyName();
  }

  else {
    processingName();
  }
});

// Name was duplicate
function duplicateName() {
  $('form').remove();
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
  duplicateNotify();
}

// Name was accepted
function acceptName() {
  $('form').remove();
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
}

// Name was denied
function denyName() {
  // Display error notification
  errorNotify();

  // Remove name from textbox
  $('#name').val('');
}

// Name contained an illegal character
function illegalName() {
  // Display error notification
  illegalNotify();

  // Remove name from textbox
  $('#name').val('');
}

// Name is being moderated
function processingName() {
  // Display processing notification
  waitNotify();
}

// Create a duplicate banner
function duplicateNotify() {
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
function errorNotify() {
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

// Create an illegal character banner
function illegalNotify() {
  // Create the banner
  var dup = $('<div>')
    .addClass('illegalNotification')
    .text('Your name can only contain English letters, dashes, or apostrophes.')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('iExitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}

// Create an processing banner
function waitNotify() {
  // Create the banner
  var error = $('<div>')
    .addClass('waitNotification')
    .text('Please wait while your name is being processed...')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('wExitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    .prependTo($(document.body));
}
