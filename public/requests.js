var requests = {
  playerId : function(simulation , message) {
    simulation.localPlayerId = message.id;
    simulation.startBlocks   = [
      'Waiting For GroundTiles',
      'Waiting For Other Players',
      'Waiting For Local Player'
    ];
    
    simulation.sendToServer(new responses['fetchGroundTiles']());
    simulation.sendToServer(new responses['fetchOtherPlayers']());
    simulation.sendToServer(new responses['createLocalPlayer'](simulation));
  },
  
  createLocalPlayer : function(simulation , message) {
    simulation.localPlayer = simulation.addPlayer(message.info);
    new ButtonDispatcher(simulation.localPlayer);
    simulation.localPlayerIsReady();
  },
  
  createPlayer : function(simulation , message) {
    simulation.addPlayer(message.info);
  },
  
  velocityUpdate : function(simulation , message) {
  },
  
  positionUpdate : function(simulation , message) {
    console.log(message);
    var player = simulation.findPlayerById(message.id);
    player.setPosition(message.position);
  },
  
  accelerationUpdate : function(simulation , message) {
  },
  
  fetchGroundTile : function(simulation , message) {
    simulation.addGroundTile(message.attributes);
  },
  
  noMoreGroundTiles : function(simulation , message) {
    simulation.groundTilesFetched();
  },
  
  noMorePlayers : function(simulation , message) {
    simulation.playersFetched();
  }
};