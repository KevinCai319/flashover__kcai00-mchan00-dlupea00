import Polygon from './../Physics/Polygon.js'
import PVector from './../Physics/PVector.js'
import GameObject from './../GameObject.js'
import Bullet from './Bullet.js';
const TANK_WIDTH = 14;
export default class Tank extends GameObject {
    hitbox = new Polygon();
    bumper = new Polygon();
    gun = new Polygon();
    movement = new PVector();
    pos = new PVector();
    rot = 0.0;
    bullet = [new Bullet()];
    cur = -1;
    constructor(sc,x,y,capacity) {
        super(sc);
        console.log('create tank0');
        this.pos = new PVector(x,y);
        this.movement = new PVector(0,0);
        this.bullet = [];
        this.cur = -1;
        this.rot = 0.0;
        for(let i = 0; i < capacity;i++){
            this.bullet.push(new Bullet(sc));
        }
        this.init();
    }
    init() {
        //setup hitbox
        this.hitbox = new Polygon(PVector.copy(this.pos));
        this.gun = new Polygon(PVector.copy(this.pos));
        this.bumper = new Polygon(PVector.copy(this.pos));
        this.movement = new PVector(0,0);
        this.hitbox.color = "#FF9999";
        this.gun.color = "#FFFFFF";
        this.bumper.color = "#FF0000";
        //this can be made to whatever polygon.
        this.hitbox.addRelativePoint(TANK_WIDTH*1.2, TANK_WIDTH);
        this.hitbox.addRelativePoint(TANK_WIDTH*1.2, -TANK_WIDTH);
        this.hitbox.addRelativePoint(-TANK_WIDTH*1.2,-TANK_WIDTH);
        this.hitbox.addRelativePoint(-TANK_WIDTH*1.2, TANK_WIDTH);
        this.bumper.addRelativePoint(TANK_WIDTH*1.2, TANK_WIDTH);
        this.bumper.addRelativePoint(TANK_WIDTH*1.2, -TANK_WIDTH);
        this.bumper.addRelativePoint(TANK_WIDTH*1.2/1.618,-TANK_WIDTH);
        this.bumper.addRelativePoint(TANK_WIDTH*1.2/1.618, TANK_WIDTH);
        this.gun.addRelativePoint(TANK_WIDTH*2, 2);
        this.gun.addRelativePoint(TANK_WIDTH*2, -2);
        this.gun.addRelativePoint(-5, -2);
        this.gun.addRelativePoint(-5, 2);
        return 0;
    }
    editMovement(vec){
        this.movement = vec;
    }
    editRot(rot){
        this.rot = rot;
    }
    applyGunRot(rot){
        this.gun.rotateAbsolute(rot);
    }
    applyMovement(){
        this.pos.translate(this.movement);
        this.hitbox.translate(this.movement);
        this.bumper.translate(this.movement);
        this.gun.translate(this.movement);
    }
    applyRotation(){
        this.bumper.rotateBody(this.rot);
        this.hitbox.rotateBody(this.rot);
    }
    update() {
        this.updateAmmo();
        // if((super.getScene().counter % 60) == 0){
        //     this.shoot();
        // }
        this.calculate();
        this.applyMovement();
        this.applyRotation();
        return 0;
    }
    //code for movement and most actions
    calculate(){
    }
    convertMouseToAngle(){
        
    }
    updateAmmo(){
        this.cur = -1;
        for(let i = 0; i< this.bullet.length;i++){
            if(this.bullet[i].update() && (this.cur == -1)){
                this.cur = i;
            }
        }
    }
    shoot(){
        if(this.cur > -1){
            this.bullet[this.cur].init(PVector.copy(this.pos),this.gun.rotation);
        }
    }
    renderAmmo(ctx){
        this.bullet.forEach(bullet => {
            bullet.render(ctx);
        });
    }
    render(ctx) {
        ctx.lineWidth = 1;
        this.hitbox.render(ctx);
        this.bumper.render(ctx);
        this.gun.render(ctx);
        this.renderAmmo(ctx);
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,2*Math.PI);
        ctx.stroke();
    }
    exit() {}
}