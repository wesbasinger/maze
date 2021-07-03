var levels = require("./levels");
var Game = require("./game");

var canvas = document.getElementById("canvas");
var level = document.getElementById("level");
var messages = document.getElementById("messages");

var game = Game.create({
    levels: levels,
    canvas : canvas,
    ctx : canvas.getContext("2d"),
    tileSize : 16
});

game.events.on("gameOver", function() {
    messages.innerText = "You win!";
});
game.events.on("leveledUp", function(data) {
    level.innerText = "";
    level.innerText = data.currentLevel;
});
game.events.on("restart", function() {
    level.innerText = "1";
    messages.innerText = "";
});

game.start();

var button = document.getElementById("js-restartButton");

button.onclick = function(e) {
    e.preventDefault();
    game.restart();
};
