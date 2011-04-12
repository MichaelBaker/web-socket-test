if (module.platform !== "browser") {
  var box2d       = require('box2dnode');
  var Class       = require('./class');
  var PlayerGroup = require('../public/player-group');
  var GroundTiles = require('../public/ground-tiles');
  var GroundTile  = require('../public/ground-tile');
  var responses   = require('responses');
  var Player      = require('./player');
}

var World = Class({
  className   : "World",
  updates     : [],
  players     : new PlayerGroup(),
  groundTiles : new GroundTiles(),
  
  initialize : function(attributes) {
    var worldAABB = new box2d.b2AABB();
    var gravity   = new box2d.b2Vec2(0.0 , attributes.gravity || -10.0);
    
    worldAABB.lowerBound.Set(attributes.lowerBound.x , attributes.lowerBound.y);
    worldAABB.upperBound.Set(attributes.upperBound.x , attributes.upperBound.y);

    this.world      = new box2d.b2World(worldAABB, gravity, attributes.sleep || true);
    this.iterations = attributes.iterations || 1;
    
    this.groundTiles.world = this.world;
  },
  
  update : function(time) {
    this.world.Step(time, this.iterations);
  },
  
  draw : function(renderer) {
    this.groundTiles.each(function(tile) {
      renderer.render(tile);
    });
    
    this.players.each(function(player) {
      renderer.render(player);
    });
  },
  
  addGroundTile : function(attributes) {
    this.groundTiles.add(new GroundTile(attributes));
  },
  
  CreateBody : function(body) {
    return this.world.CreateBody(body);
  },
  
  addPlayer : function(info) {
    info.world = this;
    return this.players.add(new Player(info));
  },
  
  findPlayerById : function(id) {
    return this.players.findById(id);
  },
  
  clearUpdates : function() {
    this.updates = [];
  },
  
  addGroundTile : function(info) {
    info.world = this.world;
    this.groundTiles.add(new GroundTile(info));
  }
});

module.exports = World;