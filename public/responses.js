var responses = {
  createLocalPlayer : function() {
    this.name = 'createLocalPlayer';
  },
  
  fetchGroundTiles : function() {
    this.name = 'fetchGroundTiles';
  },
  
  fetchOtherPlayers : function() {
    this.name = 'fetchOtherPlayers';
  },
  
  positionUpdate : function(position) {
    this.name     = 'updatePosition';
    this.position = position;
  }
};