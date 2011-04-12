if (module.platform !== "browser") {
  var Class      = require('./class');
  var StaticBody = require('./static-body');
  var box2d      = require('box2dnode');
}

var GroundTile = Class({
  className : 'GroundTile',

  initialize : function(attributes) {
    this.world      = attributes.world;
    this.originalAttributes = attributes;
    
    var groundShapeDef = new box2d.b2PolygonDef();
    groundShapeDef.SetAsBox(attributes.width/2 , attributes.height/2);

    attributes.bodyShape = groundShapeDef;
    
    this.body  = new StaticBody(attributes);
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
    var dimensions = renderer.translateWorldToScreen({
      width  : this.attributes().width,
      height : this.attributes().height
    });
    
    renderer.surface.fillStyle = 'rgb(0,0,0)';
    renderer.surface.fillRect(-(dimensions.width / 2) , 0 , dimensions.width , dimensions.height);
  },
  
  attributes : function() {
    return this.originalAttributes;
  }
});

module.exports = GroundTile;
