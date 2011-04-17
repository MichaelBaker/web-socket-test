if (module.platform !== "browser") {
  var Class      = require('./class');
  var StaticBody = require('./static-body');
  var box2d      = require('box2dnode');
}

var GroundTile = Class({
  className : 'GroundTile',

  initialize : function(attributes) {
    this.world              = attributes.world; 
    this.originalAttributes = attributes;
    this.types              = {ground : true};
    
    this.body  = new StaticBody(attributes);
    this.body.SetUserData(this);
  },
  
  dimensions : function() {
    return {width : this.originalAttributes.width , height : this.originalAttributes.height};
  },
  
  position : function() {
    return this.body.GetPosition();
  },
  
  rotation : function() {
    return this.body.GetRotation();
  },
  
  draw : function(renderer) {
    var dimensions     = renderer.translateWorldToScreen(this.dimensions());
    var screenVertices = this.vertices;
    var surface = renderer.surface;
    
    // Translate vertices the first time the time is drawn.
    if (screenVertices === undefined) {
      screenVertices = [];
      this.originalAttributes.vertices.each(function(vertex) {
        screenVertices.push(renderer.translateWorldToScreen(vertex));
      });
      
      this.vertices = screenVertices;
    }
    
    surface.fillStyle = 'rgb(0,0,0)';
    surface.beginPath();
    surface.moveTo(screenVertices[0].x , screenVertices[0].y);
    for (var i = 1 ; i < screenVertices.length ; i++) {
      surface.lineTo(screenVertices[i].x , screenVertices[i].y);
    }
    surface.closePath();
    surface.fill();
  },
  
  attributes : function() {
    return this.originalAttributes;
  },
  
  kindOf : function(type) {
    return this.types[type];
  }
});

module.exports = GroundTile;
