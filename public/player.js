if (module.platform !== "browser") {
  var Class       = require('./class');
  var DynamicBody = require('./dynamic-body');
  var box2d       = require('box2dnode');
}

var Player = Class({
  className : 'Player',
  updates   : [],
  
  initialize : function(attributes) {
    this.id         = attributes.id;
    this.username   = attributes.username || "No one";
    
    this.width      = attributes.width    || Math.max(0.5 , Math.random() * 3);
    this.height     = attributes.height   || Math.max(0.5 , Math.random() * 3);
    
    this.red    = attributes.red   || Math.floor(Math.random()*256);
    this.blue   = attributes.blue  || Math.floor(Math.random()*256);
    this.green  = attributes.green || Math.floor(Math.random()*256);
    
    var playerShapeDef = new box2d.b2PolygonDef();
    playerShapeDef.SetAsBox(this.width / 2 , this.height / 2);
    playerShapeDef.density     = 1;
    playerShapeDef.friction    = 0.5;
    playerShapeDef.restitution = 0.01;
    
    attributes.bodyShape = playerShapeDef;
    attributes.position  = attributes.position || {x : 2 , y : 6};

    this.body = new DynamicBody(attributes);
  },
  
  rgbColor : function() {
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  },
  
  attributes : function() {
    return {
      id       : this.id,
      username : this.username,
      position : this.position(),
      width    : this.width,
      height   : this.height,
      red      : this.red,
      green    : this.green,
      blue     : this.blue
    };
  },
  
  dimensions : function() {
    return {width : this.width , height : this.height};
  },
  
  position : function() {
    return this.body.GetPosition();
  },
  
  rotation : function() {
    return this.body.GetRotation();
  },
  
  volume : function() {
    return this.height * this.width;
  },
  
  draw : function(renderer) {
    var playerDimensions = renderer.translateWorldToScreen(this.dimensions());
    
    renderer.surface.fillStyle = this.rgbColor();
    renderer.surface.fillRect(-(playerDimensions.width / 2) , 0 , playerDimensions.width , playerDimensions.height);
    
    renderer.surface.fillStyle = "rgb(0,0,0)";
    renderer.surface.fillText(this.username , -(playerDimensions.width / 2) , -5 , playerDimensions.width);
  },
  
  update : function(time) {
    this.updates.push(new responses['velocityUpdate'](this.body.GetVelocity()));
    this.updates.push(new responses['angularVelocityUpdate'](this.body.GetAngularVelocity()));
    this.updates.push(new responses['angleUpdate'](this.body.GetAngle()));
    this.updates.push(new responses['positionUpdate'](this.body.GetPosition()));
  },
  
  setVelocity : function(velocity) {
    return this.body.SetVelocity(velocity);
  },
  
  setAngularVelocity : function(angularVelocity) {
    return this.body.SetAngularVelocity(angularVelocity);
  },
  
  setAngle : function(angle) {
    return this.body.SetAngle(angle);
  },
  
  setPosition : function(position) {
    return this.body.SetPosition(position);
  },
  
  setAcceleration : function(values) {
  },
  
  clearUpdates : function() {
    this.updates = [];
  },
  
  jump : function() {
    this.body.ApplyImpulse({x : 0 , y : this.volume() * 5} , this.body.GetWorldCenter())
  },
  
  crouch : function() {
    
  },
  
  moveLeft : function() {
    this.body.ApplyForce({x : -(this.volume() * 80) , y : 0} , this.body.GetWorldCenter());
  },
  
  moveRight : function() {
    var variable = this.width * this.height;
    this.body.ApplyForce({x : (this.volume() * 80), y : 0} , this.body.GetWorldCenter());
  }
});

module.exports = Player;