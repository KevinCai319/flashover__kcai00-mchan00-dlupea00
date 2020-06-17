import Tile from "./Tile.js";
import GameObject from "../GameObject.js";
import Status from "../Status.js";
import PVector from "../Physics/PVector.js";

export default class Map extends GameObject {
  tiles = [[Tile]];
  height = 0;
  width = 0;
  data = "";
  constructor(tile_height, tile_width, height, width, data) {
    super();
    this.height = tile_height;
    this.width = tile_width;
    this.addType("MAP");
    this.tileSize = {'height':(height / tile_height), 'width':(width / tile_width)};
    this.data = this.parseLevel(data);
    this.tiles = [];
    var t = 0;
    for (var y=0; y<this.height; y++) {
      var pixelY = (y * this.tileSize['height']) + (this.tileSize['height'] / 2);
      var row = [];
      for (var x=0; x<this.width; x++) {
        var pixelX = (x * this.tileSize['width']) + (this.tileSize['width'] / 2);
        var tempTile = new Tile(pixelX, pixelY, this.data[t]);
        row.push(tempTile);
        if(this.data[t]){
          this.setPkt(Status.ADD, tempTile);
        }
        t++;
      }
      this.tiles.push(row);
    }
  }
  parseLevel(str) {
    return Array.from(str).map(Number);
  }
  // render(ctx) {
  //   this.tiles.forEach((row) => {
  //     row.forEach((tile) => {
  //       tile.render(ctx);
  //     });
  //   });
  // }
  //select appropriate tiles to check for collision.
  //return array of all tiles within a certain distance.
  grabTiles(x, y) {}

  calculateNodes() {
    // for ()
  }

  exit() {}
}
