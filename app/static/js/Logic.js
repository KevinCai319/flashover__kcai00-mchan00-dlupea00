import GameHandler from "./GameHandler.js";
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// Start things off
var handler = new GameHandler(ctx);

function main(time) {
    handler.update(ctx);
    setTimeout(function() {
      requestAnimationFrame(main);
    }, 1000/60);
};

document.addEventListener('keydown', function(e) {
  document.getElementById('audio').play();
});

requestAnimationFrame(main);
