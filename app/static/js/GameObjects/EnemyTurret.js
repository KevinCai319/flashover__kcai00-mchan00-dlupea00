import Turret from "./Turret.js";
import Input from "../Input.js";
import Polygon from "../Physics/Polygon.js";
import PVector from "../Physics/PVector.js";
import Status from "../Status.js";

// The enemy tank(s) the player fights against
export default class EnemyTurret extends Turret {
    constructor(x, y, capacity) {
        super(x, y, capacity);
        super.addType("ENEMY");
        this.Input = new Input();
        this.increment = 0;
    }
    init() {
        super.init();
        this.hitbox.color = "#00FF00";
        return 0;
    }
    update() {
        this.increment++;

        var response = super.getResp();
        super.setPkt(Status.GRAB, "PLAYER");
        super.setPkt(Status.GRAB, "WALL");
        super.setPkt(Status.GRAB, "MAP");

        if (response[0]  && response[0][0]) {
            var player = response[0][0];
            var walls = response[1];
            var nodeMap = response[2][0].nodeMap;

            // Gun player tracking
            var gunVector = PVector.normalize(PVector.sub(player.pos, this.pos));
            if (gunVector.y) {      //Check for division by 0
                var gunRotation = Math.atan2(gunVector.y, gunVector.x);
                super.applyGunRot(gunRotation);
            }

            // Line of sight stopping and shooting
            var gunLOS = new Polygon(this.pos);
            gunLOS.addPoint(this.pos.x, this.pos.y);
            gunLOS.addPoint(player.pos.x, player.pos.y);
            var canSee = true;
            walls.forEach(wall => {
                if (Polygon.isColliding(gunLOS, wall.hitbox)) {canSee = false;}
            });
            if (canSee) {
                if (this.increment % 35 == 0) {super.shoot();}
            }
        }
        super.clearResp();
        return super.update();
    }
    render(ctx) {
        super.render(ctx);
    }
    exit() {}
}
