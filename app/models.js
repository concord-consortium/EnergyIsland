function Place(loc, power){
  this.location = new Nimble.Vector2f(loc[0], loc[1]);
  this.power    = power;
}

Place.prototype = {
  loc:            null,
  power:          0,
  hasBeenPlaced:  false
}

function Village(loc, power, powerNeeds) {
  Village.parentConstructor.call(this, loc, power);
  this.powerNeeds = powerNeeds;
}
extend(Village, Place);

function CoalPlant(loc, power) {
  CoalPlant.parentConstructor.call(this, loc, power);
}
extend(CoalPlant, Place);

function WindFarm(loc, power) {
  WindFarm.parentConstructor.call(this, loc, power);
}
extend(WindFarm, Place);

function Wire(loc1, loc2) {
  this.loc1 = loc1;
  this.loc2 = loc2;
}
function Network() {
  this.powerIn = 0;
  this.powerOut = 0;
  this.locations = [];
}
