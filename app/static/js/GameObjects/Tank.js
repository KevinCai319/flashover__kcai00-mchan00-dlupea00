import Polygon from "./../Physics/Polygon.js";
import PVector from "./../Physics/PVector.js";
import GameObject from "./../GameObject.js";
import Bullet from "./Bullet.js";
import Status from "../Status.js";
const TANK_SIZE = 12;
const WH_RATIO = 1.2;
const TANK_WIDTH = TANK_SIZE * WH_RATIO;
export default class Tank extends GameObject {
  hitbox = new Polygon();
  bumper = new Polygon();
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
    this.bumper = new Polygon(PVector.copy(this.pos));
    this.movement = new PVector(0, 0);
    this.hitbox.color = "#FF9999";
    this.gun.color = "#FFFFFF";
    this.bumper.color = "#FF0000";
    //this can be made to whatever polygon.
    this.hitbox.addRelativePoint(TANK_WIDTH, TANK_SIZE);
    this.hitbox.addRelativePoint(TANK_WIDTH, -TANK_SIZE);
    this.hitbox.addRelativePoint(-TANK_WIDTH, -TANK_SIZE);
    this.hitbox.addRelativePoint(-TANK_WIDTH, TANK_SIZE);
    this.bumper.addRelativePoint(TANK_WIDTH, TANK_SIZE);
    this.bumper.addRelativePoint(TANK_WIDTH, -TANK_SIZE);
    this.bumper.addRelativePoint(TANK_WIDTH / 1.618, -TANK_SIZE);
    this.bumper.addRelativePoint(TANK_WIDTH / 1.618, TANK_SIZE);
    this.gun.addRelativePoint(TANK_WIDTH * 2, 2);
    this.gun.addRelativePoint(TANK_WIDTH * 2, -2);
    this.gun.addRelativePoint(-5, -2);
    this.gun.addRelativePoint(-5, 2);
    return 0;
  }
  setHitboxColor(str){
    this.hitbox.color = str;
  }
  editMovement(vec) {
    this.movement = vec;
  }
  editRot(rot) {
    this.rot = rot;
  }
  applyGunRot(rot) {
    this.gun.rotateAbsolute(rot);
  }
  
  applyMovement() {
    if (this.movement.x || this.movement.y) {
      // new Audio('/static/Assets/Audio/Movement/Sample_0012.wav').play();
    }
    this.pos.translate(this.movement);
    this.hitbox.translate(this.movement);
    this.bumper.translate(this.movement);
    this.gun.translate(this.movement);
  }
  
  applyRotation() {
    this.bumper.rotateBody(this.rot);
    this.hitbox.rotateBody(this.rot);
  }

  update() {
    this.calculate();
    this.applyMovement();
    this.applyRotation();
    return super.update();
  }
  //code for movement and most actions
  calculate() {
    let testCollision = super.getResp();
      super.setPkt(Status.GRAB,"SOLID");
      testCollision.forEach(element => {
        if(PVector.getDistance(this.pos,element.pos) < 64){
          let mtv = Polygon.isColliding(this.hitbox,element.hitbox);
          if(mtv){
            if(this.movement.x < 0){
              mtv.x *= -1;
            }
            if(this.movement.y < 0 && mtv.y < 0){
              mtv.y *= -1;
            }
            this.movement = mtv;
            this.applyMovement();
          }
        }
      });
      super.clearResp();
  }

  shoot() {
    if(this.availableBullets > this.capacity){
      this.availableBullets = this.capacity;
    }
    if (this.availableBullets > 0) {
      new Audio("/static/Assets/Audio/launch.wav").play();
      this.availableBullets--;
      super.setPkt(Status.ADD, new Bullet(this.id,PVector.copy(this.pos), this.gun.rotation));
    }
  }

  //Render functions

  render(ctx) {
    ctx.lineWidth = 1;
    this.hitbox.render(ctx);
    this.bumper.render(ctx);
    this.gun.render(ctx);
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
  exit() {}
}
