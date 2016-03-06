# tree-display
An interactive tree data structure visualization for the CIS department display at KSU's 2016 Open House

## Roadmap

...just some notes to guide development and help explain the final project goal to anyone who might want to contribute.

### High Level User Experience

Visitors to the 2016 KSU Open House will stop by the CIS booth where they will see a large TV with a binary tree of names, sorted by alphabetical order.  There will be a poster with a link, and users will use their phones to submit names (their own) to be added to the tree.  When names are added to the tree, an animation takes place.  This animation includes any necessary operations for adding the node, to include rotations, rebalancing, etc.

### Requirements

- A mobile responsive website interface for submitting names
- A whitelist of common names which can be added to the tree without human approval
- A blacklist of "bad words" against which names can be checked so that the moderator's time is not wasted.
- A moderation interface for approving submissions not auto-approved or auto-denied
- A means for the submitting user to be notified that the moderating user or the automatic system has denied their submission. (Web socket connection)
- A server for serving the html for all interfaces, storing submissions in memory, and coordinating web socket messages and events.

#### Sumission Interface

The submission interface will establish a websocket connection on page load, and an event listener will be attached to the submit button.

When the submit button is clicked (and if the name field is populated):

- A message with the name will be pushed via Websocket
- The submit button listener will be removed
- The page will change to a state indicating that their submission is pending approval and letting them know that they should be watching the display.

...It might be cool to give the user a countdown timer in seconds so that they know exactly when the display will be adding their name.  (We can have a queue on ther server for this.)

#### Whitelist & Blacklist

These lists will be a combination of downloaded files and custom name lists.  As the moderator approves or denies submissions, they will be added to the appropriate list so that subsequent submissions will recieve the same moderation result without wasting anyone's time.

#### Moderating Interface

Upon establishing a web socket connection with the server, this page will recieve the queue of submissions pending approval.  By using key press event listeners, the user can moderate the names with one keypress (left and right arrow keys perhapse?...or maybe a Hammer.js left and right swipe).

Depending on whether we think we will have an infrequent need for moderation, we might want to use the JavaScript vibration API to notify the moderator (assuming mobile device).

## Contribute

Fork this repository, make your changes and the make a pull request.  If you want commit access to this repo, ask.

## Development Instructions

We are using node.js for the server because this is a simple project, node.js handles evented things pretty ok, and because it makes my life easier.

What this means for you...

- You'll need to have node.js installed on your machine to run the project server
- If `package.json` was modified by any commits that your are pulling down, you will need to run `npm install` in the root directory of the project to install/update the dependencies.  To make your life easier, just run `npm install` every time you "pull" (actually fetch then rebase) changes.  For maximum laziness, make a git hook to do it for you. ;)
