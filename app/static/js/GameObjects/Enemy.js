// import Tank from "./Tank.js";
// import Input from "../Input.js";
// import PVector from "../Physics/PVector.js";

// // The enemy tank(s) the player fights against
// export default class Enemy extends Tank {
//     constructor(x, y, capacity) {
//         super(x, y, capacity);
//         super.addType("ENEMY");
//         this.Input = new Input();
//     }
//     init() {
//         super.init();
//         this.hitbox.color = "#00FF00";
//         return 0;
//     }
//     update() {
//         super.setPkt(Status.GRAB, "PLAYER");
//         super.setPkt(Status.GRAB, "NODE");
//         var response = super.getResp();

//         var player = response[0][0]
//         var nodes = TODO: need node objects and LOS connections and distances from each other and their position to calc dist from end

//         // Gun player tracking
//         var gunVector = PVector.normalize(PVector.sub(player.pos, this.pos));
//         if (gunVector.y) {      //Check for division by 0
//             var gunRotation = Math.atan2(gunVector.y, gunVector.x);
//             super.applyGunRot(gunRotation);
//         }

//         // Line of sight stopping and shooting
//         if (TODO:ray line of sight is clear) {
//             super.shoot();
//         }
        
//         // Line of sight nodes

        
//         // A* pathing
//         //queue current position as a node
//         //add to queue LOS nodes in order of heuristic
//         //go through queue adding in order of heuristic
//         //backtrace path achieved
//         var path = TODO:array of tiles

//         // Turn to face nodes
//         var currVector = PVector.getUnitVec(this.hitbox.rotation);
//         var nodeVector = TODO:
//         var angleBetween = TODO:
//         var MAX_ROTATION = Math.PI / 180;
//         if ((angleBetween <= 180) && (angleBetween >= MAX_ROTATION)) {
//             var rotation = -1 * MAX_ROTATION;
//         } else if ((angleBetween <= 180) && (angleBetween < MAX_ROTATION)) {
//             var rotation = angleBetween;
//         } else if ((angleBetween > 180) && (angleBetween >= MAX_ROTATION)) {
//             var rotation = MAX_ROTATION;
//         } else if ((angleBetween > 180) && (angleBetween < MAX_ROTATION)) {
//             var rotation = angleBetween;
//         }
//         super.editRot(rotation);

//         // Movement between nodes
//         var moveVector = new PVector(0, 0);
//         if (angleBetween == 0) {
//             if (TODO:NOT reached destination node) {
//                 moveVector.translate(PVector.getUnitVec(this.hitbox.rotation));
//                 super.editMovement(moveVector);
//             }
//         }

        
//         return super.update();
//     }
//     render(ctx) {
//         super.render(ctx);
//     }
//     exit() {}
// }
