require('./public/utilities');
var Game   = require('./public/game');
var Server = require('server');

var game   = new Game();
var server = new Server();

game.gameLoop = function(time) {
  game.world.clearUpdates();
  game.world.update(time);
  game.world.updates.each(function(update) {
    game.sendToAll(update);
  });
};

// TEMPORARY - Must input this from a map file
game.world.addGroundTile({
  x      : 0,
  y      : 0,
  world  : this,
  width  : 9,
  height : 1
});
// END TEMPORARY

game.network      = server;
server.simulation = game;

server.listen(8000);
game.run();