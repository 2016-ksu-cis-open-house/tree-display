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
