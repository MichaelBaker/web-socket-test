var Renderer = Class({
  className : 'Renderer',
  
  initialize : function() {
    var canvas = jQuery('#main-viewport');
    
    this.scalingFactor = 50;
    this.surface       = canvas[0].getContext('2d');
    
    this.surface.translate(0 , canvas.outerHeight());
    this.surface.scale(1 , -1);
    this.surface.save();
    
    this.viewport = {
      width  : this.translateScreenToWorld(canvas.outerWidth()),
      height : this.translateScreenToWorld(canvas.outerHeight()),
      x      : -6,
      y      : 0
    };
  },
  
  render : function(entity) {
    var entityPosition    = this.translateWorldToScreen(entity.position());
    var entityDimensions  = this.translateWorldToScreen(entity.dimensions());
    var viewport          = this.translateWorldToScreen(this.viewport);
    var xOffset           = entityPosition.x - viewport.x;
    var yOffset           = entityPosition.y - viewport.y;

    this.surface.save();
    
    this.surface.translate(xOffset , yOffset);
    this.surface.rotate(entity.rotation());
    
    entity.draw(this);
    
    this.surface.restore();
  },
  
  clearScreen : function() {
    var dimensions = this.translateWorldToScreen(this.viewport);
    
    this.surface.clearRect(0 , 0 , dimensions.width , dimensions.height);
  },
  
  translateWorldToScreen : function(object) {
    var self = this;
    
    if (typeof object === 'number') {
      return object * self.scalingFactor;
    }
    else {
      var newObject = {};
      
      object.eachAttribute(function(key , value) {
        if (typeof value === 'number') {
          newObject[key] = value * self.scalingFactor;
        }
      });
      
      return newObject;
    }
  },
  
  translateScreenToWorld : function(object) {
    if (typeof object === 'number') {
      return object / this.scalingFactor;
    }
    else {
      var newObject = {};
      
      object.eachAttribute(function(key , value) {
        if (typeof value === 'number') {
          newObject[key] = value / this.scalingFactor;
        }
      });
      
      return newObject;
    }
  }
});