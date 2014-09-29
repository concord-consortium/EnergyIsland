/// [Set stylesheet]
$.app.addStyleFilename("app/styles.css");

load('app/util.js');
load('app/controllers.js');
load('app/views.js');
load('app/models.js');

var background = $.app.backgroundLayer();

for (var i = 0; i < 6; i++) {
  villagesController.addVillage();
  windFarmsController.addWindFarm();
  coalPlantsController.addCoalPlant();
}
