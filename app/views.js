var x, y;
function PlaceView(controller, cssId) {
  this.controller = controller;

  this.widget = new MultiWidgets.JavaScriptWidget();
  this.widget.setCSSId("parent");

  var image = new MultiWidgets.Widget();
  image.setInputFlags(MultiWidgets.Widget.INPUT_NONE);
  image.setCSSId(cssId);
  this.widget.addChild(image);

  var powerConnector = new MultiWidgets.JavaScriptWidget();
  powerConnector.setInputFlags(MultiWidgets.Widget.INPUT_SINGLE_TAPS);
  var center = new Nimble.Vector2f(10,10);
  var axis = new Nimble.Vector2f(0,10);
  powerConnector.onRenderContent(function(r) {
    if (controller.get("hasBeenPlaced")) {
      style = new Luminous.Style();
      style.setFillColor(0, 0, 0.3, 0.4);
      style.setStrokeColor(0, 0, 0.3, 0.4);
      if (controller.get("isStartingPowerDrag")) {
        r.drawCircle(center, 12, style);
      } else {
        r.drawDonut(center, axis, 10, 3, style);
      }
    }
  });
  powerConnector.setCSSId("powerConnector");
  powerConnector.setOrigin(new Nimble.Vector2f(-0.4,-1.1));
  this.widget.addChild(powerConnector);

  if (controller.get("location")) {
    this.widget.setLocation(controller.get("location"));
  }

  this.widget.onUpdate(function(){
    controller.set("location", controller.get("view").widget.location());
    if (this.hasInteraction()) {
      controller.set("hasBegun", true);
    } else if (controller.get("hasBegun")) {
      controller.set("hasBeenPlaced", true);
    }
  });

  powerConnector.onSingleTap(function() {
    if (controller.get("isStartingPowerDrag")) {
      wiresController.removeLocation(controller);
    } else {
      wiresController.addLocation(controller);
    }
  });

  this.widget.clearInputFlags(MultiWidgets.Widget.INPUT_SCALE);
  this.widget.clearInputFlags(MultiWidgets.Widget.INPUT_ROTATION);
}

function CoalPlantView(controller) {
  CoalPlantView.parentConstructor.call(this, controller, "coalplant");
}
extend(CoalPlantView, PlaceView);

function WindFarmView(coalplant) {
  WindFarmView.parentConstructor.call(this, coalplant, "windfarm");
}
extend(WindFarmView, PlaceView);

function VillageView(village) {
  VillageView.parentConstructor.call(this, village, "village");

  var donut = new MultiWidgets.JavaScriptWidget();
  donut.setInputFlags(MultiWidgets.Widget.INPUT_NONE);
  var center = new Nimble.Vector2f(50,50);
  var axis = new Nimble.Vector2f(0,70);
  donut.onRenderContent(function(r) {
    if (village.get("hasBeenPlaced")) {
      style = new Luminous.Style();
      style.setFillColor(1.0, 0, 0.3, 0.3)
      style.setStrokeColor(1.0, 0, 0.3, 0.3)
      r.drawDonut(center, axis, 70, 15, style);
    }
  });
  donut.setCSSId("donut");
  this.widget.addChild(donut);

  var power = new MultiWidgets.JavaScriptWidget();
  power.setInputFlags(MultiWidgets.Widget.INPUT_NONE);
  power.onRenderContent(function(r) {
    if (village.get("hasBeenPlaced")) {
      style = new Luminous.Style();
      style.setFillColor(0, 1, 0, 1)
      style.setStrokeColor(1.0, 1.0 - 5 * 0.2, 0.3, 0.9);

      powerMeter = Math.PI + (village.get("powerShown") * 2 * Math.PI);
      r.drawDonut(center, axis, 70, 15, style, 100, 3.14, powerMeter);
    }
  });
  power.setCSSId("power");
  this.widget.addChild(power);

  x = this.widget;
  this.widget.onUpdate(function(){
    village.set("location", village.get("view").widget.location());
    if (this.hasInteraction()) {
      village.set("hasBegun", true);
    } else if (village.get("hasBegun")) {
      village.set("hasBeenPlaced", true);
    }
    village.update();
  });
}
extend(VillageView, PlaceView);

function WireView(wire) {
  this.widget = new MultiWidgets.JavaScriptWidget();
  this.widget.setBackgroundColor(0,0,0,0);
  this.widget.setInputFlags(MultiWidgets.Widget.INPUT_NONE);
  this.widget.setSize($.app.mainLayer().size().width(), $.app.mainLayer().size().height());
  this.widget.onRenderContent(function(r) {
    style = new Luminous.Style();
    style.setStrokeColor(0, 0, 0, 0.9);
    var loc1   = wire.loc1.get("location"),
        loc2   = wire.loc2.get("location"),
        start  = new Nimble.Vector2f(loc1.x + 50, loc1.y + 120),
        end    = new Nimble.Vector2f(loc2.x + 50, loc2.y + 120);
    r.drawLine(start,end,style);
  });
}
