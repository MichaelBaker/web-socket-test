require('./public/utilities');
var Game   = require('./public/game');
var Server = require('server');
var File   = require('fs');
var repl   = require('repl');

var game   = new Game();
var server = new Server();

game.gameLoop = function(time) {
  game.world.clearUpdates();
  game.world.update(time);
  game.world.updates.each(function(update) {
    if (update.id) {
      sendToAllExcept(id , update);
    }
    else {
      game.sendToAll(update);
    }
  });
};

var map = JSON.parse(File.readFileSync('./maps/map1.map'));
map.tiles.each(function(tile) {
  game.world.addGroundTile(tile);
});

process.game   = game;
process.server = server;

game.network      = server;
server.simulation = game;

server.listen(8000);
game.run();

repl.start('~>');