onmessage = function(message) {
  postMessage(message);
}
/*
var webSocket = {};

var handleError = function() {
  
};

var handleClose = function() {
  
};

var handleOpen = function() {
  
};

var handleMessage = function(message) {
  var newMessage = {
    name    : 'update',
    message : message.data
  };
  
  postMessage(JSON.parse(newMessage));
};

var messageTable = {
  connect : function(message) {
    webSocket           = new WebSocket("ws://" + message.url.replace(/ /g , ""));
    webSocket.onerror   = handleError;
    webSocket.onclose   = handleClose;
    webSocket.onopen    = handleOpen;
    webSocket.onmessage = handleMessage;
  },
  
  send : function(message) {
    webSocket.send(JSON.stringify(message.message));
  }
};

onmessage = function(message) {
  messageTable[message.name](message);
};

this.webSocket.onmessage = function(message) {
  self.simulation.notify();
};
*/