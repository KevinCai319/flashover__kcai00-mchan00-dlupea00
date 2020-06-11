import GameObject from '../GameObject.js'
import Tank from './Tank.js'
import PVector from '../Physics/PVector.js';
import Polygon from '../Physics/Polygon.js';

export default class Bullet extends GameObject{
    pos = new PVector();
    movement = new PVector();
    hitbox = new Polygon();
    state = "inactive";
    constructor(sc){
        super(sc);
        this.state = "inactive";
        this.movement = new PVector();
        this.pos = new PVector();
        this.hitbox = new PVector();
    }
    init(pos, rotation){
        let tmp = PVector.getUnitVec(rotation);
        tmp.scale(35);
        this.pos = PVector.add(pos,tmp);
        this.hitbox = new Polygon(this.pos);
        this.hitbox.addRelativePoint(0,0);
        this.hitbox.addRelativePoint(-5,2);
        this.hitbox.addRelativePoint(-15,2);
        this.hitbox.addRelativePoint(-15,-2);
        this.hitbox.addRelativePoint(-5,-2);
        this.movement = PVector.getUnitVec(rotation);
        this.movement.scale(.5);
        this.hitbox.rotateBody(rotation);
        this.state = "active";
    }
    update() {
        if(this.state === "active"){
            this.pos.translate(this.movement);
            this.hitbox.translate(this.movement);
            if(this.pos.x < 0 || this.pos.x > 960 || this.pos.y < 0 ||this.pos.y > 480){
                this.hitbox = null;
                this.pos = null;
                this.movement = null;
                this.state = "inactive";
                return 1;
            }
            return 0;
        }else{
            return 1;
        }
    }
    render(ctx){
        if(this.state === "active"){
            this.hitbox.render(ctx);
        }
    }
}