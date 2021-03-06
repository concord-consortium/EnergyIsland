extend = function(Child, Parent, properties) {
  var F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  if (properties) {
      for (var k in properties) {
          Child.prototype[k] = properties[k];
      }
  }
  Child.prototype.constructor = Child;
  Child.parentConstructor = Parent;
  Child.uber = Parent.prototype;
}
