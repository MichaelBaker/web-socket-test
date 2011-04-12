if (module.platform !== "browser") {
  var Class = require('./class');
  var box2d = require('box2dnode');
}

var StaticBody = Class({
  className : 'StaticBody',
  
  initialize : function(attributes) {
    this.world = attributes.world;
    
    var staticBodyDefinition = new box2d.b2BodyDef();
    staticBodyDefinition.position.Set(attributes.x, attributes.y);
    
    this.staticBody = this.world.CreateBody(staticBodyDefinition);
    this.staticBody.CreateShape(attributes.bodyShape);
  },
  
  GetPosition : function() {
    return this.staticBody.GetPosition();
  },
  
  GetRotation : function() {
    return this.staticBody.GetAngle();
  }
});

module.exports = StaticBody;