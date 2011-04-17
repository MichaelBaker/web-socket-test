if (module.platform !== "browser") {
  var Class = require('./class');
  var box2d = require('box2dnode');
  var Map   = require('./map');
}

var StaticBody = Class({
  className : 'StaticBody',
  
  initialize : function(attributes) {
    this.world = attributes.world;
    
    var shapeDefinition         = new box2d.b2PolygonDef();
    shapeDefinition.vertices    = Map.parseVertices(attributes.vertices);
    shapeDefinition.vertexCount = attributes.vertices.length - 1;

    
    var staticBodyDefinition = new box2d.b2BodyDef();
    staticBodyDefinition.position.Set(attributes.position.x, attributes.position.y);
    
    this.staticBody = this.world.CreateBody(staticBodyDefinition);
    this.staticBody.CreateShape(shapeDefinition);
  },
  
  GetPosition : function() {
    return this.staticBody.GetPosition();
  },
  
  GetRotation : function() {
    return this.staticBody.GetAngle();
  },
  
  SetUserData : function(data) {
    this.staticBody.SetUserData(data);
  },
  
  GetUserData : function() {
    return this.staticBody.GetUserData();
  },
  
  GetContactList : function() {
    var list = [];
    var currentEdge = this.staticBody.m_contactList;
    
    while (currentEdge) {
      list.push(currentEdge.contact);
      currentEdge = currentEdge.next;
    }
    
    return list;
  }
});

module.exports = StaticBody;