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
    dynamicBodyDefinition.angle = attributes.rotation || 0;
    
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
  },
  
  grounded : function() {
    var result = false;
    
    this.GetContactList().each(function(contact) {
      contact.GetManifolds().each(function(manifold) {
        if (Math.atan2(manifold.normal.y , manifold.normal.x).toPrecision(4) === (Math.PI/2).toPrecision(4)) {
          result = true;
        }
      });
    });
    
    return result;
  },
  
  SetUserData : function(data) {
    this.dynamicBody.SetUserData(data);
  },
  
  GetContactList : function() {
    var list = [];
    var currentEdge = this.dynamicBody.m_contactList;
    
    while (currentEdge) {
      list.push(currentEdge.contact);
      currentEdge = currentEdge.next;
    }
    
    return list;
  }
});

module.exports = DynamicBody;