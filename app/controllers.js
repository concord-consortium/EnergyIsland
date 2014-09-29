VillagesController = function() {
  this.villages = [];
}

VillagesController.prototype = {
  addVillage: function() {
    var village = new Village([50, 100], 0, 1);
    var villageController = Object.create(this);
    villageController.village = village;
    this.villages.push(village);
    village.powerShown = village.powerNeeds;
    village.view = new VillageView(villageController);
    $.app.mainLayer().addChild(village.view.widget);
  },
  get: function(prop) {
    if (this.village) {
      return this.village[prop];
    }
  },
  set: function(prop, val) {
    if (this.village) {
      this.village[prop] = val;
    }
  },
  adjust: function(prop, d) {
    if (this.village) {
      this.village[prop] += d;
      this.village[prop] = Math.max(this.village[prop], 0);
    }
  },
  update: function() {
    if (this.village && this.village.hasBeenPlaced) {
      var power = 0;
      if (this.village.network) {
        power = this.village.network.powerIn / this.village.network.powerOut;
        power = Math.min(power, 1);
      }
      if (power > 0) {
        diff = power - this.get("powerShown");
        this.adjust("powerShown", diff/4);
      } else {
        this.adjust("powerShown", -0.002);
      }
    }
  }
}

villagesController = new VillagesController();

WindFarmsController = function() {
  this.windFarms = [];
}

WindFarmsController.prototype = {
  addWindFarm: function() {
    var windFarm = new WindFarm([50, 300], 0.5);
    var windFarmController = Object.create(this);
    windFarmController.windFarm = windFarm;
    this.windFarms.push(windFarm);
    windFarm.view = new WindFarmView(windFarmController);
    $.app.mainLayer().addChild(windFarm.view.widget);
  },
  get: function(prop) {
    if (this.windFarm) {
      return this.windFarm[prop];
    }
  },
  set: function(prop, val) {
    if (this.windFarm) {
      this.windFarm[prop] = val;
    }
  },
  adjust: function(prop, d) {
    if (this.windFarm) {
      this.windFarm[prop] += d;
      this.windFarm[prop] = Math.max(this.windFarm[prop], 0);
    }
  }
}

windFarmsController = new WindFarmsController();

CoalPlantsController = function() {
  this.coalPlants = [];
}

CoalPlantsController.prototype = {
  addCoalPlant: function() {
    var coalPlant = new CoalPlant([50, 500], 1);
    var coalPlantController = Object.create(this);
    coalPlantController.coalPlant = coalPlant;
    this.coalPlants.push(coalPlant);
    coalPlant.view = new CoalPlantView(coalPlantController);
    $.app.mainLayer().addChild(coalPlant.view.widget);
  },
  get: function(prop) {
    if (this.coalPlant) {
      return this.coalPlant[prop];
    }
  },
  set: function(prop, val) {
    if (this.coalPlant) {
      this.coalPlant[prop] = val;
    }
  },
  adjust: function(prop, d) {
    if (this.coalPlant) {
      this.coalPlant[prop] += d;
      this.coalPlant[prop] = Math.max(this.coalPlant[prop], 0);
    }
  }
}

coalPlantsController = new CoalPlantsController();

WiresController = function() {
  this.wires = [];
  this.firstLocation = null;
}
WiresController.prototype = {
  createWire: function(loc1, loc2) {
    wire = new Wire(loc1, loc2);
    this.wires.push(wire);
    wireView = new WireView(wire);
    networksController.addWire(wire);
    $.app.mainLayer().addChild(wireView.widget);
  },
  addLocation: function(loc) {
    if (!this.firstLocation) {
      loc.set("isStartingPowerDrag", true);
      this.firstLocation = loc;
    } else {
      this.createWire(this.firstLocation, loc);
      loc.set("isStartingPowerDrag", false);
      this.firstLocation.set("isStartingPowerDrag", false);
      this.firstLocation = null;
    }
  },
  removeLocation: function(loc) {
    loc.set("isStartingPowerDrag", false);
    this.firstLocation = null;
  }
}
wiresController = new WiresController();

NetWorksController = function() {
  this.networks = [];
}
NetWorksController.prototype = {
  addWire: function(wire) {
    var network;
    if (wire.loc1.get("network")) {
      network = wire.loc1.get("network");
      if (wire.loc2.get("network")) {
        this.mergeNetworks(wire.loc1.get("network"), wire.loc2.get("network"));
      } else {
        this.addToNetwork(network, wire.loc2);
      }
    } else if (wire.loc2.get("network")) {
      network = wire.loc2.get("network");
      this.addToNetwork(network, wire.loc1);
    } else {
      network = new Network();
      this.addToNetwork(network, wire.loc1);
      this.addToNetwork(network, wire.loc2);
    }
  },
  addToNetwork: function(network, location) {
    location.set("network", network);
    network.locations.push(location);
    if (location.get("power")) {
      network.powerIn += location.get("power");
    } else {
      network.powerOut += location.get("powerNeeds");
    }
  },
  mergeNetworks: function(network1, network2) {
    network = new Network();
    network.powerIn  = network1.powerIn  + network2.powerIn;
    network.powerOut = network1.powerOut + network2.powerOut;
    network.locations = network1.locations.concat(network2.locations);
    for (var i = 0, ii = network.locations.length; i < ii; i++){
      network.locations[i].set("network", network);
    }
  }
}
networksController = new NetWorksController();
