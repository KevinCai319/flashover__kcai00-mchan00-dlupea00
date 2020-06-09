import Polygon from '../Physics/Polygon'
import PVector from '../Physics/PVector'
import GameObject from '../GameObject'
export default class Tank extends GameObject {
    constructor(x, y) {
        super(x,y);
        this.tileID = id;
        this.hitbox = new Polygon();
        this.movement = new PVector();
    }
    init() {
        //setup hitbox
        this.hitbox.addPoint(this.x+16, this.y + 16);
        this.hitbox.addPoint(this.x+16, this.y - 16);
        this.hitbox.addPoint(this.x-16, this.y - 16);
        this.hitbox.addPoint(this.x-16, this.y + 16);
        return 0;
    }
    update() {
        return 0;
    }
    render(ctx) {
        this.hitbox.render(ctx);
    }
    exit() {}
}