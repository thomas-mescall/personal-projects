"use strict";

function init() {
    let stage = new createjs.Stage("demoCanvas");
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
}