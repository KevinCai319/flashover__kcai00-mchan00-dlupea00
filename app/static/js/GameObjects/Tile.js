import GameObject from '../GameObject.js';
import Polygon from '../Physics/Polygon.js';

export default class Tile extends GameObject {
    constructor(x, y, id) {
        super();
        this.x = x;
        this.y = y;
        this.tileID = id;
        this.hitbox = new Polygon();
        this.init();
    }
    init() {
        return 0;
    }
    update() {
        return 0;
    }
    render(ctx) {}
    exit() {}
}