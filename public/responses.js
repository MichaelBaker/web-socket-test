var responses = {
  createLocalPlayer : function() {
    this.name     = 'createLocalPlayer';
    this.username = jQuery('#username').val();
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
  },
  
  angularVelocityUpdate : function(angularVelocity) {
    this.name            = 'angularVelocityUpdate';
    this.angularVelocity = angularVelocity;
  },
  
  angleUpdate : function(angle) {
    this.name  = 'angleUpdate';
    this.angle = angle;
  }
};