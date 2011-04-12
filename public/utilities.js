Object.defineProperty(Object.prototype , 'eachAttribute' , {
  value : function(func) {
    for (var attribute in this) {
      if (this.hasOwnProperty(attribute)) {
        func(attribute , this[attribute]);
      }
    }
  }
});

Object.defineProperty(Object.prototype , 'copyAttributes' , {
  value : function(from) {
    var self = this;
    
    from.eachAttribute(function(key , value) {
      self[key] = value;
    });
    
    return self;
  }
});

Object.defineProperty(Object.prototype , 'include' , {
  value : function(other) {
    var theThingToExtend = this.prototype || this;

    other.eachAttribute(function(key , value) {
      theThingToExtend[key] = value;
    });

    return theThingToExtend;
  }
});

Object.defineProperty(Array.prototype , 'each' , {
  value : function(func) {
    if (this.length < 1) { return; }
    for(var i = 0 ; i < this.length ; i++) { 
      func(this[i]);
    }
  }
});