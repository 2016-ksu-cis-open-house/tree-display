var socket = io();

function add(word){
  $($('input')[0]).val(word);
  $($('input')[1]).click();
}

function remove(word){
  $($('input')[2]).val(word);
  $($('input')[3]).click();
}



// Add a name to the tree
socket.on('add name', function(msg){
  console.log(msg);
});


// Remove a name from the tree
socket.on('remove name', function(msg){
  console.log(msg);
});
