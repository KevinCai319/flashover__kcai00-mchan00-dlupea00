import Polygon from "./../Physics/Polygon.js";
import PVector from "./../Physics/PVector.js";
import GameObject from "./../GameObject.js";
import Bullet from "./Bullet.js";
import Status from "../Status.js";
const TANK_SIZE = 12;
const WH_RATIO = 1.2;
const TANK_WIDTH = TANK_SIZE * WH_RATIO;
const TURRET_RADIUS = 12;
export default class Turret extends GameObject {
  hitbox = new Polygon();
  gun = new Polygon();
  movement = new PVector();
  pos = new PVector();
  rot = 0.0;
  capacity = 2;
  availableBullets = 0;
  constructor(x, y, capacity) {
    super();
    this.pos = new PVector(x, y);
    this.movement = new PVector(0, 0);
    this.addType("SOLID");
    this.addType("TANK");
    this.cur = -1;
    this.rot = 0.0;
    this.availableBullets += capacity;
    this.capacity = capacity;
    this.init();
  }
  init() {
    //setup hitbox
    this.hitbox = new Polygon(PVector.copy(this.pos));
    this.gun = new Polygon(PVector.copy(this.pos));
    this.movement = new PVector(0, 0);
    this.hitbox.color = "#FF9999";
    this.gun.color = "#000000";
    //this can be made to whatever polygon.
    for (var i=0; i<(2*Math.PI); i+=(Math.PI/3)) {
        this.hitbox.addRelativePoint(TURRET_RADIUS*Math.cos(i), TURRET_RADIUS*Math.sin(i));
    }
    this.gun.addRelativePoint(TANK_WIDTH * 2, 2);
    this.gun.addRelativePoint(TANK_WIDTH * 2, -2);
    this.gun.addRelativePoint(-5, -2);
    this.gun.addRelativePoint(-5, 2);
    return 0;
  }
  setHitboxColor(str){
    this.hitbox.color = str;
  }
  applyGunRot(rot) {
    this.gun.rotateAbsolute(rot);
  }
  update() {
    return super.update();
  }
  shoot() {
    if(this.availableBullets > this.capacity){
      this.availableBullets = this.capacity;
    }
    if (this.availableBullets > 0) {
      // new Audio("/static/Assets/Audio/bplant.wav").play();
      new Audio("/static/Assets/Audio/launch.wav").play();
      this.availableBullets--;
      super.setPkt(Status.ADD, new Bullet(this.id,PVector.copy(this.pos), this.gun.rotation));
    }
  }

  //Render functions

  render(ctx) {
    ctx.lineWidth = 1;
    this.hitbox.render(ctx);
    this.gun.render(ctx);
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
  exit() {}
}
