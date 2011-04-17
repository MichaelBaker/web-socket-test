var Renderer = Class({
  className : 'Renderer',
  
  initialize : function() {
    this.canvas            = jQuery('#main-viewport');
    this.scalingFactor     = 40;
    this.viewportThreshold = 100;
    
    this.surface       = this.canvas[0].getContext('2d');
    this.surface.scale(1 , -1);
    this.surface.translate(0 , -this.canvas.outerHeight());
    this.surface.save()
    
    this.viewport = {
      width  : 16 * this.scalingFactor,
      height : 12 * this.scalingFactor,
      x      : -8 * this.scalingFactor,
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
    this.surface.rotate(entity.rotation());
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
  },
  
  setViewportPosition : function(values) {
    this.viewport.x = values.x;
    this.viewport.y = values.y;
  },
  
  updateViewport : function(values) {
    var position = this.translateWorldToScreen(values);
    var x        = this.viewport.x;
    var y        = this.viewport.y;
    
    if (position.x < x + this.viewportThreshold) {
      x = position.x - this.viewportThreshold;
    }
    else if (position.x > x - this.viewportThreshold + this.viewport.width) {
      x = position.x + this.viewportThreshold - this.viewport.width;
    }
    
    if (position.y < y + this.viewportThreshold) {
      y = position.y - this.viewportThreshold;
    }
    else if (position.y > y + this.viewport.height - this.viewportThreshold) {
      y = position.y + this.viewportThreshold - this.viewport.height;
    }
    
    y = Math.max(y , 0);
    
    this.setViewportPosition({x : x , y : y});
  }
});