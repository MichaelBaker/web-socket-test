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
    
    var groundShapeDef = new box2d.b2PolygonDef();
    groundShapeDef.SetAsBox(attributes.width / 2 , attributes.height / 2);

    attributes.bodyShape = groundShapeDef;
    
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
    var dimensions = renderer.translateWorldToScreen(this.dimensions());
    
    renderer.surface.fillStyle = 'rgb(0,0,0)';
    renderer.surface.fillRect(-(dimensions.width / 2) , 0 , dimensions.width , dimensions.height);
  },
  
  attributes : function() {
    return this.originalAttributes;
  },
  
  kindOf : function(type) {
    return this.types[type];
  }
});

module.exports = GroundTile;
