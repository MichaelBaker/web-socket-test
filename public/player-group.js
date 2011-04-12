if (module.platform !== "browser") {
  var Class = require('./class');
}

var PlayerGroup = Class({
  className : "PlayerGroup",
  players   : {},
  
  add : function(player) {
    this.players[player.id] = player;
    return player;
  },
  
  update : function(time) {
    this.players.eachAttribute(function(id , player) {
      player.update(time);
    });
  },
  
  draw : function(renderer) {
    this.players.eachAttribute(function(id , player) {
      renderer.render(player);
    });
  },
  
  clearUpdates : function() {
    this.players.eachAttribute(function(id , player) {
      player.clearUpdates();
    });
  },
  
  findById : function(id) {
    return this.players[id];
  },
  
  each : function(func) {
    this.players.eachAttribute(function(id , player) {
      func(player);
    });
  }
});

module.exports = PlayerGroup;