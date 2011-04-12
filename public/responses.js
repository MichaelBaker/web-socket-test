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
    this.name     = 'positionUpdate';
    this.position = position;
  },
  
  velocityUpdate : function(velocity) {
    this.name     = 'velocityUpdate';
    this.velocity = velocity;
  }
};