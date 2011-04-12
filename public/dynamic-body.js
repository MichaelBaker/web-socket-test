if (module.platform !== "browser") {
  var box2d = require('box2dnode');
  var Class = require('./class');
}

var DynamicBody = Class({
  className : 'DynamicBody',
  
  initialize : function(attributes) {
    this.world = attributes.world;
    
    var dynamicBodyDefinition = new box2d.b2BodyDef();
    dynamicBodyDefinition.position.Set(attributes.position.x, attributes.position.y);
    
    this.dynamicBody = this.world.CreateBody(dynamicBodyDefinition);
    this.dynamicBody.CreateShape(attributes.bodyShape);
    this.dynamicBody.SetMassFromShapes();
  },
  
  GetPosition : function() {
    return this.dynamicBody.GetPosition();
  },
  
  GetVelocity : function() {
    return this.dynamicBody.GetLinearVelocity();
  },
  
  GetRotation : function() {
    return this.dynamicBody.GetAngle();
  },
  
  SetPosition : function(position) {
    var lastPosition = this.GetPosition();
    
    if (position.x !== lastPosition.x || position.y !== lastPosition.y) {
      this.dynamicBody.SetXForm(position , this.GetRotation());
      return true;
    }
    else {
      return false;
    }
  },
  
  SetVelocity : function(velocity) {
    var lastVelocity = this.GetVelocity();
    
    if (velocity.x !== lastVelocity.x || velocity.y !== lastVelocity.y) {
      this.dynamicBody.SetLinearVelocity(velocity);
      return true;
    }
    else {
      return false;
    }
  },
  
  GetWorldCenter : function() {
    return this.dynamicBody.GetWorldCenter();
  },
  
  ApplyForce : function(force , location) {
    this.dynamicBody.ApplyForce(force , location);
  }
});

module.exports = DynamicBody;