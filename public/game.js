if (module.platform !== "browser") {
  var Class       = require('../public/class');
  var responses   = require('responses');
  var requests    = require('requests');
  var util        = require('util');
  var World       = require('../public/world');
}

var Game = Class({
  className       : "Game",
  messageHandlers : {},
  world           : new World({
    upperBound : {x :  1000 , y :   1000},
    lowerBound : {x : -1000 , y :  -1000},
  }),
  
  initialize : function(network) {
    var self      = this;
    
    this.framesPerSecond = 30;
    this.world.game      = this;
    
    requests.eachAttribute(function(name , handler) {
      self.messageHandlers[name] = handler;
    });
  },
  
  run : function() {
    this.eachFrame(this.gameLoop);
  },
  
  notify : function(message) {
    if (this.messageHandlers[message.name]) {
      this.messageHandlers[message.name](this , message);
    }
    else {
      if (util) {
        util.log("Unknown Request - \033[31m" + message.name + "\033[30m");
      }
      else {
        console.log("Unknown Request - " + message.name);
      }
    }
  },
  
  eachFrame : function(func) {
    var lastTime     = new Date().getTime();
    var timePerFrame = 1000/this.framesPerSecond;

    var executeFrame = function() {
      var startTime               = new Date().getTime();
      var timeElapsedFromLastTick = startTime - lastTime;

      func(timeElapsedFromLastTick / 1000);
      
      lastTime = new Date().getTime();

      setTimeout(executeFrame , 0);
    };

    executeFrame();
  },
  
  sendToAllExcept : function(id , message) {
    this.network.sendToAllExcept(id , message);
  },
  
  sendTo : function(id , message) {
    this.network.sendTo(id , message);
  },
  
  sendToAll : function(message) {
    this.network.sendToAll(message);
  },
  
  addPlayer : function(info) {
    return this.world.addPlayer(info);
  },
  
  findPlayerById : function(id) {
    return this.world.findPlayerById(id);
  },
  
  localPlayerIsReady : function() {
    this.startBlocks.pop();
    this.tryToStart();
  },
  
  tryToStart : function() {
    if (this.localPlayerReady) {
      this.run();
    }
  },
  
  sendToServer : function(message) {
    message.id = this.localPlayerId;
    this.network.send(message);
  },
  
  addGroundTile : function(attributes) {
    return this.world.addGroundTile(attributes);
  },
  
  groundTilesFetched : function() {
    this.startBlocks.pop();
    this.tryToStart();
  },
  
  playersFetched : function() {
    this.startBlocks.pop();
    this.tryToStart();
  },
  
  tryToStart : function() {
    if (this.startBlocks.length < 1) {
      this.run();
    }
  },
  
  eachPlayer : function(func) {
    this.world.players.each(function(player) {
      func(player);
    });
  }
});

module.exports = Game;