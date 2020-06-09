import GameHandler from "./GameHandler.js";

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
// Start things off
var handler = new GameHandler(ctx);
function main() {
    handler.update();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);
