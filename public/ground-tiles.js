if (module.platform !== "browser") {
  var Class = require('./class');
}

var GroundTiles = Class({
  className : 'GroundTiles',
  tiles     : {},
  idCounter : 0,
  
  nextId : function() {
    this.idCounter += 1;
    return "groundTile-" + this.idCounter;
  },
  
  add : function(tile) {
    tile.id = this.nextId();
    this.tiles[tile.id] = tile;
  },
  
  findById : function(id) {
    return tiles[id];
  },
  
  each : function(func) {
    this.tiles.eachAttribute(function(id , tile) {
      func(tile);
    });
  }
});

module.exports = GroundTiles;