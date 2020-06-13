import GameHandler from "./GameHandler.js";
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
// Start things off
var handler = new GameHandler(ctx);

function main(time) {
    handler.update(ctx);
    // input.logKey()
    setTimeout(function() {
      requestAnimationFrame(main);
    }, 1000/60);
    // This gets a relatively consistent frame rate of 20-30 with a few stutters above that
    // Shooting still looks a little random but the framerate monitor shows really good consistency
}

requestAnimationFrame(main);
