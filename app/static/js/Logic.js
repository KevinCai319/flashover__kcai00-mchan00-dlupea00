import GameHandler from "./GameHandler.js";
import Input from "./Input.js"

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
// Start things off
var handler = new GameHandler(ctx);
// var input = new Input(document)
function main(time) {
    handler.update(ctx);
    // input.logKey()
    requestAnimationFrame(main);
}
requestAnimationFrame(main);
