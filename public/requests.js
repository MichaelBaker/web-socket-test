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
    console.log(message);
    simulation.addPlayer(message.info);
  },
  
  velocityUpdate : function(simulation , message) {
    var player = simulation.findPlayerById(message.id);
    player.setVelocity(message.velocity);
  },
  
  positionUpdate : function(simulation , message) {
    var player = simulation.findPlayerById(message.id);
    player.setPosition(message.position);
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