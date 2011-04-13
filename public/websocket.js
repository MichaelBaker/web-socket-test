var webSocket = {};

var handleError = function() {
  
};

var handleClose = function() {
  
};

var handleOpen = function() {
  
};

var handleMessage = function(message) {
  var newMessage = {
    name : 'notify',
    data : message.data
  };

  postMessage(newMessage);
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
    webSocket.send(JSON.stringify(message.data));
  }
};

onmessage = function(message) {
  messageTable[message.data.name](message.data);
};