(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function() {
// Queue functionality from code.stephenmorley.org
function Queue() {
  this.a=[]
  this.b=0;
  }
  // Get the length of the queue
  Queue.prototype.getLength=function(){
    return this.a.length-this.b;
  };

  // Tell the user whether or not the queue is empty
  Queue.prototype.isEmpty=function()
  {
    return 0===this.a.length;
  };

  // Add an element to the end of the queue
  Queue.prototype.enqueue=function(b)
  {
    this.a.push(b);
  };

  // Remove and return the element at the front of the queue
  Queue.prototype.dequeue=function()
  {
    if(0!==this.a.length)
    {
      var c=this.a[this.b];
      this.a.splice(0, 1);
      return c;
    }
  };

  // Return the value of the element at the front of the queue
  Queue.prototype.peek=function()
  {
    return 0<this,this.a.length?this.a[this.b]:void 0;
  };

  // Return whether or not the key is in the queue
  Queue.prototype.containsKey=function(name)
  {
    var i;
    for(i = 0; i < this.a.length; i++)
    {
      if(this.a[i]['name'] == name)
      {
        return true;
      }
    }
    return false;
  };

return Queue;
}());

},{}],2:[function(require,module,exports){
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

},{"./queue.js":1}]},{},[2,1]);
