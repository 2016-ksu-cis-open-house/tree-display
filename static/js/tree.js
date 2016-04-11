var socket = io();


var $addField = $($('input')[0]);
var $addButton = $($('input')[1]);
var $removeField = $($('input')[2]);
var $removeButton = $($('input')[3]);


// Add a name to the tree
socket.on('add name', function(msg){
  console.log(msg);
});
