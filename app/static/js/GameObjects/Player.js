import Tank from "./Tank.js"
import PVector from "../Physics/PVector.js";
//The tank that the player is controlling.
export default class Player extends Tank{
    constructor(sc,x, y,capacity) {
        super(sc,x,y,capacity);
    }
    init() {
        super.init();
        super.editColor("#00FF00");
        return 0;
    }
    //should read inputs and update physics
    update() {
        // super.shoot();
        super.update();
        return 0;
    }
    exit() {}
}