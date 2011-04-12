var ButtonDispatcher = Class({
  buttonTable : {
    '- - - - W' : 'up',
    '- - - - A' : 'left',
    '- - - - S' : 'down',
    '- - - - D' : 'right'
  },
  
  initialize : function(player) {
    var self = this;
    
    this.player = player;
    
    jQuery(document).keydown(function(event) {
      self.dispatchKeyEvent(event);
    });
  },
  
  translateKeyEvent : function(event) {
    var keys = [];
    
    keys.push(event.altKey   ? "a" : "-");
    keys.push(event.ctrlKey  ? "c" : "-");
    keys.push(event.shiftKey ? "s" : "-");
    keys.push(event.metaKey  ? "m" : "-");
    keys.push(String.fromCharCode(event.which).toUpperCase());
    
    return keys.join(' ');
  },
  
  up : function() {
    this.player.jump();
  },
  
  down : function() {
    this.player.crouch();
  },
  
  left : function() {
    this.player.moveLeft();
  },
  
  right : function() {
    this.player.moveRight();
  },
  
  bindKeyCode : function(event , functionName) {
    var key = this.translateEvent(event);
    
    this.buttonTable[key] = functionName;
  },
  
  dispatchKeyEvent : function(event) {
    var self = this;
    var key  = this.translateKeyEvent(event);

    if (this.buttonTable[key]) {
      var functionName = this.buttonTable[key];
      self[functionName]();
    }
  }
});