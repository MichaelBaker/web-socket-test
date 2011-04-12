var Client = Class({
  className : "Client",
  
  handleClose : function() {
    
  },
  
  handleError : function() {
    
  },
  
  connect : function(url) {
    var self = this;
    
    this.webSocket = new WebSocket("ws://" + url.replace(/ /g , ""));
    this.webSocket.onerror   = this.handleError;
    this.webSocket.onclose   = this.handleClose;
    this.webSocket.onopen    = this.handleOpen;
    
    this.webSocket.onmessage = function(message) {
      self.simulation.notify(JSON.parse(message.data));
    };
  },
  
  handleOpen : function() {
    
  },
  
  send : function(message) {
    this.webSocket.send(JSON.stringify(message));
  }
});