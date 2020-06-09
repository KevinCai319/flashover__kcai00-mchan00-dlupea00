import GameHandler from "./GameHandler.js";

const status = {
    ERROR: "error",
    GOOD: "good",
};


var canvas = document.getElementById("game");

// Start things off
var handler = new GameHandler();
function main() {
    handler.update();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);
