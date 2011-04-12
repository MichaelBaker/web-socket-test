// Classes must have a className attribute
function Class (attributes) {
  var initialize = attributes.initialize || function() {};
  
  var newClass = function() {
    this.self = this;
    initialize.apply(this , Array.prototype.splice.call(arguments , 0));
  };
  
  newClass.include(attributes);
  
  newClass.subClass = function(superClass) {
    newClass.prototype.__proto__ = new superClass();
    newClass.prototype.super = newClass.prototype.__proto__;
  };
  
  return newClass;
}

module.exports = Class