import Polygon from './../Physics/Polygon.js'
import PVector from './../Physics/PVector.js'
import GameObject from './../GameObject.js'
import Bullet from './Bullet.js';
export default class Tank extends GameObject {
    hitbox = new Polygon();
    gun = new Polygon();
    movement = new PVector();
    pos = new PVector();
    bullet = [new Bullet()];
    cur = -1;
    constructor(sc,x,y,capacity) {
        super(sc);
        console.log('create tank0');
        this.pos = new PVector(x,y);
        this.movement = new PVector(0,0);
        this.bullet = [];
        this.cur = -1;
        for(let i = 0; i < capacity;i++){
            this.bullet.push(new Bullet(sc));
        }
        this.init();
    }
    init() {
        //setup hitbox
        this.hitbox = new Polygon(this.pos);
        this.gun = new Polygon(this.pos);
        this.movement = new PVector(0,0);
        this.editColor("#FF9999");
        //this can be made to whatever polygon.
        this.hitbox.addRelativePoint(16, 16);
        this.hitbox.addRelativePoint(16, -16);
        this.hitbox.addRelativePoint(-16,-16);
        this.hitbox.addRelativePoint(-16, 16);
        this.gun.addRelativePoint(30, 2);
        this.gun.addRelativePoint(30, -2);
        this.gun.addRelativePoint(-5, -2);
        this.gun.addRelativePoint(-5, 2);
        return 0;
    }
    editColor(color){
        this.hitbox.color = color;
        this.gun.color = "FF00FF";
    }
    update() {
        this.gun.rotateBody(5* Math.PI/180);
        this.updateAmmo();
        this.shoot();
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
        this.hitbox.render(ctx);
        this.gun.render(ctx);
        this.renderAmmo(ctx);
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,2*Math.PI);
        ctx.stroke();
    }
    exit() {}
}