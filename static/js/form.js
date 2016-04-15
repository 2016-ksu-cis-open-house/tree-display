var socket = io();
var submitEle = jQuery('input')

// Handle when the user submits a name to the tree
$('form').submit(function(e) {
  e.preventDefault();

  // Disable textbox and button
  submitEle.attr('disabled', 'disabled');

  // Send the name to the server to be verified as appropriate
  socket.emit('verify name', $('#name').val());

  // Remove any notifications from the form
  $('#notification_wrapper').html("");
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
  else if(msgResponse['action'] == 'limit') {
    limitName();
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
  // Remove any notifications from the form
  $('#notification_wrapper').html("");

  $('form').remove();
  $('.registration').append($('<br><br>'), $('<h3>').text('Thanks!'));
}

// Name was denied
function denyName() {
  // Remove any notifications from the form
  $('#notification_wrapper').html("");

  // Enable submit textbox and button
  submitEle.removeAttr("disabled");

  // Display error notification
  errorNotify();

  // Remove name from textbox
  $('#name').val('');
}

// Name contained an illegal character
function illegalName() {
  // Enable submit textbox and button
  submitEle.removeAttr("disabled");

  // Display error notification
  illegalNotify();

  // Remove name from textbox
  $('#name').val('');
}

// Name suprassed the character limit
function limitName() {
  // Enable submit textbox and button
  submitEle.removeAttr("disabled");

  // Display error notification
  limitNotify();

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
    .addClass('greenNotification')
    .text('Aw, snap! Your name is either already on the tree or will be shortly.')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('gExitButton')
        .text('X')
        .click(function() {
          dup.fadeOut(250);
        })
      )
    $('#notification_wrapper').append(dup);
    window.scroll(0,0);
}

// Create an error banner
function errorNotify() {
  // Create the banner
  var error = $('<div>')
    .addClass('redNotification')
    .text('Error: Name was not accepted')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('rExitButton')
        .text('X')
        .click(function() {
          error.fadeOut(250);
        })
      )
    $('#notification_wrapper').append(error);
    window.scroll(0,0);
}

// Create an illegal character banner
function illegalNotify() {
  // Create the banner
  var illegal = $('<div>')
    .addClass('redNotification')
    .text('Your name can only contain English letters, dashes, or apostrophes.')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('rExitButton')
        .text('X')
        .click(function() {
          illegal.fadeOut(250);
        })
      )
    $('#notification_wrapper').append(illegal);
    window.scroll(0,0);
}

// Create an illegal character banner
function limitNotify() {
  // Create the banner
  var limit = $('<div>')
    .addClass('redNotification')
    .text('Your name exceeds the maximum number of 15 characters.')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('rExitButton')
        .text('X')
        .click(function() {
          illegal.fadeOut(250);
        })
      )
    $('#notification_wrapper').append(limit);
    window.scroll(0,0);
}

// Create an processing banner
function waitNotify() {
  // Create the banner
  var wait = $('<div>')
    .addClass('purpleNotification')
    .text('Please wait while your name is being processed...')
    .append(
      // Create the exit button for the banner
      $('<div>')
        .addClass('pExitButton')
        .text('X')
        .click(function() {
          wait.fadeOut(250);
        })
      )
    $('#notification_wrapper').append(wait);
    window.scroll(0,0);
}
