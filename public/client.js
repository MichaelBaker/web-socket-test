var Client = Class({
  className : "Client",
  
  handleClose : function() {
    
  },
  
  handleError : function() {
    
  },
  
  connect : function(url) {
    var self = this;

    this.worker = new Worker('websocket.js');
    
    this.worker.onmessage = function(message) {
      if (message.data.name === 'notify') {
        self.simulation.notify(JSON.parse(message.data.data));
      }
      else if (message.data.name === 'debug') {
        console.log(JSON.parse(message.data));
      }
    };
    
    this.worker.postMessage({
      name : 'connect',
      url  : url
    });
  },
  
  handleOpen : function() {
    
  },
  
  send : function(message) {
    this.worker.postMessage({
      name : 'send',
      data : message
    });
  }
});