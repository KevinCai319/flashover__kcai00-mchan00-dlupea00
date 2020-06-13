import Tank from "./Tank.js"
import Input from "../Input.js"
import PVector from "../Physics/PVector.js"
//The tank that the player is controlling.
export default class Player extends Tank{
    constructor(sc,x, y,capacity) { 
        super(sc,x,y,capacity);
        this.Input = new Input();
        this.cursor = new PVector(0,0);
    }
    init() {
        super.init();
        this.hitbox.color = "#00FF00";
        return 0;
    }
    //should read inputs and update physics
    update() {
        // super.shoot();
        if(this.Input.clicked()){
            super.shoot();
        }
        this.cursor = this.Input.getMouse();
        if(!this.cursor){
            this.cursor = new PVector(0,0);
        }
        let gunRvec = PVector.normalize(PVector.sub(this.cursor,this.pos));
        if(gunRvec.y){
            let gunRot = Math.atan2(gunRvec.y,gunRvec.x);
            super.applyGunRot(gunRot);
        }
        let nMovement = new PVector(0,0);
        let rot = 0;
        if(this.Input.keydown('a') &&  !this.Input.keydown('d')){
            rot = -Math.PI/180;
        }
        if(this.Input.keydown('d') &&  !this.Input.keydown('a')){
            rot = Math.PI/180;   
        }
        if(this.Input.keydown('w')){
            nMovement.translate(PVector.getUnitVec(this.hitbox.rotation));
        }
        if(this.Input.keydown('s')){
            nMovement.translate(PVector.getUnitVec(this.hitbox.rotation+Math.PI));
        }
        nMovement.scale(2);
        rot *= 3;
        super.editRot(rot);
        super.editMovement(nMovement);
        super.update();
        return 0;
    }
    render(ctx){
        super.render(ctx);
        ctx.beginPath();
        ctx.arc(this.cursor.x,this.cursor.y,5,0,2*Math.PI);
        ctx.stroke();
    }
    exit() {}
}