var updates = {
  velocityUpdate : function(id , velocity) {
    this.name     = 'velocityUpdate';
    this.id       = id;
    this.velocity = velocity;
  },
  
  positionUpdate : function(id , position) {
    this.name     = 'positionUpdate';
    this.id       = id;
    this.position = position;
  },
  
  accelerationUpdate : function(id , acceleration) {
    this.name         = 'accelerationUpdate';
    this.id           = id;
    this.acceleration = acceleration;
  }
}