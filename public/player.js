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
    this.grounded   = false;
    this.types      = {player : true};
    
    this.force      = {x : 0 , y : 0};
    this.moveForce  = 17;
    
    this.width      = attributes.width    || Math.max(0.5 , Math.random() * 3);
    this.height     = attributes.height   || Math.max(0.5 , Math.random() * 3);
    
    this.red    = attributes.red   || Math.floor(Math.random()*256);
    this.blue   = attributes.blue  || Math.floor(Math.random()*256);
    this.green  = attributes.green || Math.floor(Math.random()*256);
    
    var playerShapeDef = new box2d.b2PolygonDef();
    playerShapeDef.SetAsBox(this.width / 2 , this.height / 2);
    playerShapeDef.density     = 1;
    playerShapeDef.friction    = 0.95;
    playerShapeDef.restitution = 0.01;
    
    attributes.bodyShape = playerShapeDef;
    attributes.position  = attributes.position || {x : 2 , y : 6};

    this.body = new DynamicBody(attributes);
    this.body.SetUserData(this);
  },
  
  rgbColor : function() {
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  },
  
  attributes : function() {
    return {
      id       : this.id,
      username : this.username,
      position : this.position(),
      rotation : this.rotation(),
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
    var surface = renderer.surface;
    
    surface.fillStyle = this.rgbColor();
    surface.fillRect(-(playerDimensions.width / 2) , -(playerDimensions.height / 2) , playerDimensions.width , playerDimensions.height);
    
    surface.save()
    surface.fillStyle = "rgb(0,0,0)";
    surface.translate(0 , (playerDimensions.height / 2));
    surface.scale(1 , -1);
    surface.fillText(this.username , -(playerDimensions.width / 2) , -5 , playerDimensions.width);
    surface.restore()
  },
  
  update : function(time) {
    this.grounded = this.body.grounded();
    
    this.updates.push(new responses['angleUpdate'](this.body.GetAngle()));
    this.updates.push(new responses['positionUpdate'](this.body.GetPosition()));
    
    this.body.ApplyForce(this.force , this.body.GetWorldCenter());
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
    if (this.grounded) {
      this.body.ApplyImpulse({x : 0 , y : this.volume() * 5} , this.body.GetWorldCenter());
      this.updates.push(new responses['jump']);
    }
  },
  
  crouch : function() {
    
  },
  
  moveLeft : function() {
    this.force.x -= (this.volume() * this.moveForce);
    this.updates.push(new responses['left']());
  },
  
  moveRight : function() {
    this.force.x += (this.volume() * this.moveForce);
    this.updates.push(new responses['right']());
  },
  
  kindOf : function(type) {
    return this.types[type];
  }
});

module.exports = Player;