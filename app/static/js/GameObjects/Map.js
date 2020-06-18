import Tile from "./Tile.js";
import GameObject from "../GameObject.js";
import Status from "../Status.js";
import Polygon from "../Physics/Polygon.js";

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
        // console.log(this.data[t]);
        t++;
      }
      this.tiles.push(row);
    }
    this.nodeMap = this.calculateNodes(this.tiles);
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

  calculateNodes(tiles) {
    var nodeTiles = [];
    var wallTiles = [];
    for (var y=0; y<this.height; y++) {
        for (var x=0; x<this.width; x++) {
            var currTile = tiles[y][x];
            // console.log(currTile.tileID);
            if (currTile.tileID == 4) {
                nodeTiles.push(currTile);
            }
            if (currTile.tileID == 1) {
                wallTiles.push(currTile);
            }
        }
        // console.log(nodeTiles);
    }
    // console.log(nodeTiles);
    var nodeMap = [];
    for (var i=0; i<nodeTiles.length; i++) {
        var currNode = nodeTiles[i];
        var connections = [];
        for (var j=0; j<nodeTiles.length; j++) {
            var otherNode = nodeTiles[j];
            if (i != j) {
                var ray = new Polygon(currNode.pos);
                ray.addPoint(currNode.pos.x, currNode.pos.y);
                ray.addPoint(otherNode.pos.x, otherNode.pos.y);

                var obstructed = false;
                for (var k=0; k<wallTiles.length; k++) {
                    var currWall = wallTiles[k];
                    if (Polygon.isColliding(ray, currWall.hitbox)) {
                        obstructed = true;
                    }
                }

                if (!obstructed) {connections.push(otherNode.pos);}
            }
        }
        nodeMap.push(
            {
                pos: currNode.pos,
                conns: connections,
            }
        );
    }
    return nodeMap;
  }

  exit() {}
}
