import Tile from "./Tile.js";
import GameObject from "../GameObject.js";

export default class Map extends GameObject {
  tiles = [[new Tile()]];
  height = 0;
  width = 0;
  data = "";
  constructor(sc, height, width, data) {
    super(sc);
    this.height = height;
    this.width = width;
    this.data = this.parseLevel(data);
    this.tiles = [];
    var t = 0;
    for (var y = 16; y <= this.height; y += 32) {
      var row = [];
      for (var x = 16; x <= this.width; x += 32) {
        row.push(new Tile(sc, x, y, this.data[t]));
        t++;
      }
      this.tiles.push(row);
    }
  }
  update() {
    return 0;
  }
  parseLevel(str) {
    return Array.from(str).map(Number);
  }
  render(ctx) {
    this.tiles.forEach((row) => {
      row.forEach((tile) => {
        tile.render(ctx);
      });
    });
  }
  //select appropriate tiles to check for collision.
  //return array of all tiles within a certain distance.
  grabTiles(x, y) {}
  exit() {}
}
