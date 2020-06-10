import Polygon from './../Physics/Polygon.js'
import PVector from './../Physics/PVector.js'
import GameObject from './../GameObject.js'
export default class Tank extends GameObject {
    hitbox = new Polygon();
    movement = new PVector();
    pos = new PVector();
    constructor(x, y) {
        super();
        this.pos = new PVector(x,y);
        this.init();
    }
    init() {
        //setup hitbox
        this.hitbox = new Polygon(this.pos.x,this.pos.y);
        this.movement = new PVector(0,0);
        //this can be made to whatever polygon.
        this.hitbox.addPoint(this.pos.x+16, this.pos.y + 16);
        this.hitbox.addPoint(this.pos.x+16, this.pos.y - 16);
        this.hitbox.addPoint(this.pos.x-16, this.pos.y - 16);
        this.hitbox.addPoint(this.pos.x-16, this.pos.y + 16);
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