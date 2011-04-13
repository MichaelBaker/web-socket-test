var Renderer = Class({
  className : 'Renderer',
  
  initialize : function() {
    this.canvas = jQuery('#main-viewport');
    
    this.scalingFactor = 40;
    this.surface       = this.canvas[0].getContext('2d');
    this.surface.scale(1 , -1);
    this.surface.translate(0 , -this.canvas.outerHeight());
    this.surface.save()
    
    this.viewport = {
      width  : 16 * this.scalingFactor,
      height : 12 * this.scalingFactor,
      x      : -6 * this.scalingFactor,
      y      :  0 * this.scalingFactor
    };
  },
  
  render : function(entity) {
    var position   = this.translateWorldToScreen(entity.position());
    var dimensions = this.translateWorldToScreen(entity.dimensions());
    
    var xOffset = position.x - this.viewport.x;
    var yOffset = position.y - this.viewport.y;
    
    this.surface.save()
    
    this.surface.translate(xOffset , yOffset);
    this.surface.scale(1 , -1);
    this.surface.translate(0 , -dimensions.height / 2);
    this.surface.translate(0 , dimensions.height / 2);
    this.surface.rotate(-entity.rotation());
    this.surface.translate(0 , -dimensions.height / 2);
    
    entity.draw(this);
    
    this.surface.restore()
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