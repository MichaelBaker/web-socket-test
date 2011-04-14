var ButtonDispatcher = Class({
  buttonTable : {
    '- - - - W' : {
      up     : 'doNothing',
      down   : 'up',
      active : false
      },
    '- - - - A' : {
      up     : 'right',
      down   : 'left',
      active : false
      },
    '- - - - S' : {
      up     : 'doNothing',
      down   : 'down',
      active : false
    },
    '- - - - D' : {
      up     : 'left',
      down   : 'right',
      active : false
    }
  },
  
  initialize : function(player) {
    var self = this;
    
    this.player = player;
    
    jQuery(document).keydown(function(event) {
      self.dispatchKeyDownEvent(event);
    });
    
    jQuery(document).keyup(function(event) {
      self.dispatchKeyUpEvent(event);
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
  
  bindKeyCode : function(event , callbacks) {
    var key = this.translateEvent(event);
    
    this.buttonTable[key] = {
      up     : callbacks.onup   || 'doNothing',
      down   : callbacks.ondown || 'doNothing',
      active : false
    };
  },
  
  doNothing : function() {  
  },
  
  dispatchKeyDownEvent : function(event) {
    var self = this;
    var key  = this.translateKeyEvent(event);

    if (this.buttonTable[key]) {
      var keyState = this.buttonTable[key];
      
      if (!keyState.active) {
        keyState.active = true;
        this[keyState.down]();
      }
    }
  },
  
  dispatchKeyUpEvent : function(event) {
    var self = this;
    var key  = this.translateKeyEvent(event);

    if (this.buttonTable[key]) {
      var keyState = this.buttonTable[key];
      
      if (keyState.active) {
        keyState.active = false;
        this[keyState.up]();
      }
    }
  }
});