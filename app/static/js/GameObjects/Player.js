import Tank from "./Tank.js"
import PVector from "../Physics/PVector.js";
//The tank that the player is controlling.
export default class Player extends Tank{
    constructor(sc,x, y) {
        super(sc,x,y);
    }
    init() {
        super.init();
        super.editColor("#00FF00");
        // this.movement.translate(new PVector(1,0));
        return 0;
    }
    //should read inputs and update physics
    update() {
        this.gun.rotateBody(1);
        super.update();
        return 0;
    }
    exit() {}
}