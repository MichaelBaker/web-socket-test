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
  
  SetAngularVelocity : function(angularVelocity) {
    var lastVelocity = this.GetAngularVelocity();
    
    if (angularVelocity !== lastVelocity) {
      this.dynamicBody.SetAngularVelocity(angularVelocity);
      return true;
    }
    else {
      return false;
    }
  },
  
  SetAngle : function(angle) {
    var lastAngle = this.GetAngle();
    
    if (angle !== lastAngle) {
      this.dynamicBody.SetXForm(this.dynamicBody.GetPosition() , angle);
      return true;
    }
    else {
      return false;
    }
  },
  
  GetWorldCenter : function() {
    return this.dynamicBody.GetWorldCenter();
  },
  
  GetAngularVelocity : function() {
    return this.dynamicBody.GetAngularVelocity();
  },
  
  GetAngle : function() {
    return this.dynamicBody.GetAngle();
  },
  
  ApplyForce : function(force , location) {
    this.dynamicBody.ApplyForce(force , location);
  },
  
  ApplyImpulse : function(force , location) {
    this.dynamicBody.ApplyImpulse(force , location);
  }
});

module.exports = DynamicBody;