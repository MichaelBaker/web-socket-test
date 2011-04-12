if (module.platform !== "browser") {
  var Class       = require('./class');
  var DynamicBody = require('./dynamic-body');
  var box2d       = require('box2dnode');
}

var Player = Class({
  className : 'Player',
  updates   : [],
  
  initialize : function(attributes) {
    this.id     = attributes.id;
    this.name   = this.name     || "No one";
    this.width  = this.width    || 1;
    this.height = this.height   || 1;
    
    this.red    = attributes.red   || Math.floor(Math.random()*256);
    this.blue   = attributes.blue  ||Math.floor(Math.random()*256);
    this.green  = attributes.green ||Math.floor(Math.random()*256);
    
    var playerShapeDef = new box2d.b2PolygonDef();
    playerShapeDef.SetAsBox(this.width/2 , this.height/2);
    playerShapeDef.density  = 2;
    playerShapeDef.friction = 0.9;
    playerShapeDef.restitution = 0.1;
    
    attributes.bodyShape = playerShapeDef;
    attributes.position  = attributes.position || {x : 3 , y : 6};

    this.body = new DynamicBody(attributes);
  },
  
  rgbColor : function() {
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  },
  
  attributes : function() {
    return {
      id       : this.id,
      name     : this.name,
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
  
  draw : function(renderer) {
    var playerDimensions = renderer.translateWorldToScreen({
      width : this.width,
      height : this.height
    });
    
    renderer.surface.fillStyle = this.rgbColor();
    renderer.surface.fillRect(-(playerDimensions.width / 2) , 0 , playerDimensions.width , playerDimensions.height);
  },
  
  update : function(time) {
    this.updateVelocity();
    this.updatePosition();
  },
  
  updateVelocity : function(time) {
    this.updates.push(new responses['velocityUpdate'](this.body.GetVelocity()));
  },
  
  updatePosition : function(time) {
    this.updates.push(new responses['positionUpdate'](this.body.GetPosition()));
  },
  
  setVelocity : function(velocity) {
    return this.body.SetVelocity(velocity);
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
  },
  
  crouch : function() {
    
  },
  
  moveLeft : function() {
    this.body.ApplyForce({x : -15 , y : 0} , this.body.GetWorldCenter());
  },
  
  moveRight : function() {
    this.body.ApplyForce({x : 15 , y : 0} , this.body.GetWorldCenter());
  }
});

module.exports = Player;