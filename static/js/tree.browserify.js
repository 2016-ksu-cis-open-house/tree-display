// NOTE: This page is to be browserified
// browserify tree.browserify.js queue.js -o tree.js

var socket = io();
var Queue = require('./queue.js');

var jobQueue = new Queue();
var treeTimer = setInterval(checkTree, 1000);

// Add a name to the queue
socket.on('add name', function(msg){
  jobQueue.enqueue([add, msg]);
});

// Create job to remove name from tree
socket.on('remove name', function(msg){
  jobQueue.enqueue([remove, msg]);
});

socket.on('full tree', function(data) {
  console.log("Full tree recieved");
  for (var i = 0; i < data.a.length; i++) {
    add(data.a[i]);
    $('input')[11].click();
  }
});

function add(word){
  $($('input')[0]).val(word);
  $($('input')[1]).click();
}

function remove(word){
  $($('input')[2]).val(word);
  $($('input')[3]).click();
}

// Check if tree is busy, and add job is not
function checkTree(){
  if (!$('input')[1].disabled && !jobQueue.isEmpty()) {
    job = jobQueue.dequeue();
    job[0](job[1]);
  }
}
socket.emit('full tree');
