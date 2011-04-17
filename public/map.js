if (module.platform !== "browser") {
  var box2d = require('box2dnode');
}


var Map = {
  parseVertices : function(vertices) {
    var box2dVertices = [];
    
    vertices.each(function(vertex) {
      box2dVertices.push(new box2d.b2Vec2(vertex.x , vertex.y));
    });
    
    return box2dVertices;
  }
};

module.exports = Map;