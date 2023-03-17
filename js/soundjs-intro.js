"use strict";

var soundID = "Thunder";

function loadSound() {
    createjs.Sound.registerSound("assets/lightning.mp4", soundID);
}

function playSound() {
    createjs.Sound.play(soundID);
}