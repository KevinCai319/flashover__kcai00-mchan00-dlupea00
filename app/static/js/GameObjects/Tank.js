import Polygon from './../Physics/Polygon.js'
import PVector from './../Physics/PVector.js'
import GameObject from './../GameObject.js'
export default class Tank extends GameObject {
    hitbox = new Polygon();
    gun = new Polygon();
    movement = new PVector();
    pos = new PVector();
    constructor(sc,x, y) {
        super(sc);
        this.pos = new PVector(x,y);
        this.movement = new PVector(0,0);
        this.init();
    }
    init() {
        //setup hitbox
        this.hitbox = new Polygon(this.pos);
        this.gun = new Polygon(this.pos);
        this.movement = new PVector(0,0);
        this.editColor("#FF9999");
        //this can be made to whatever polygon.
        this.hitbox.addPoint(this.pos.x+16, this.pos.y + 16);
        this.hitbox.addPoint(this.pos.x+16, this.pos.y - 16);
        this.hitbox.addPoint(this.pos.x-16, this.pos.y - 16);
        this.hitbox.addPoint(this.pos.x-16, this.pos.y + 16);
        this.gun.addPoint(this.pos.x+30, this.pos.y+2);
        this.gun.addPoint(this.pos.x+30, this.pos.y-2);
        this.gun.addPoint(this.pos.x-5, this.pos.y-2);
        this.gun.addPoint(this.pos.x-5, this.pos.y+2);
        return 0;
    }
    editColor(color){
        this.hitbox.color = color;
        this.gun.color = "FF00FF";
    }
    update() {
        this.calculate();
        this.hitbox.translate(this.movement);
        this.gun.translate(this.movement);
        return 0;
    }
    //code for movement and most actions
    calculate(){
    }
    convertMouseToAngle(){
        
    }
    render(ctx) {
        this.hitbox.render(ctx);
        this.gun.render(ctx);
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,2*Math.PI);
        ctx.stroke();
    }
    exit() {}
}