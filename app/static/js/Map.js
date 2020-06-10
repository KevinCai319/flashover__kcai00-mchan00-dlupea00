import Tile from './GameObjects/Tile.js';

export default class Map {
    constructor(height, width, data) {
        this.height = height;
        this.width = width;
        this.data = data;
        tiles = [];
    }
    init() {
        for(var y=0; y<=this.height; y++) {
            var row = [];
            for(var x=0; x<=this.width; x++) {
                row.push(new Tile(x, y, null));
            }
            tiles.push(row);
        }
        return 0;
    }
    update() {
        return 0;
    }
    exit() {}
}