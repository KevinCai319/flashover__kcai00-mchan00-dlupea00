import Polygon from "./../Physics/Polygon.js";
import PVector from "./../Physics/PVector.js";
import GameObject from "./../GameObject.js";
import Bullet from "./Bullet.js";
import Status from "../Status.js";
const TANK_SIZE = 12;
const WH_RATIO = 1.2;
const TANK_WIDTH = TANK_SIZE * WH_RATIO;
export default class Helicopter extends GameObject {
  hitbox = new Polygon();
  blades = new Polygon();
  tailbox = new Polygon();
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
    this.tailbox = new Polygon(PVector.copy(this.pos));
    this.blades = new Polygon(PVector.copy(this.pos));
    this.movement = new PVector(0, 0);
    this.hitbox.color = "#FF9999";
    this.gun.color = "#FFFFFF";
    this.blades.color = "#FF0000";
    this.tailbox.color = "#00FF00";
    //this can be made to whatever polygon.
    this.hitbox.addRelativePoint(-1 * TANK_WIDTH, 0);
    this.hitbox.addRelativePoint(-6,10);
    this.hitbox.addRelativePoint(8,8);
    this.hitbox.addRelativePoint(24,0);
    this.hitbox.addRelativePoint(8,-8);
    this.hitbox.addRelativePoint(-6,-10);
    this.tailbox.addRelativePoint(26,8);
    this.tailbox.addRelativePoint(22,8);
    this.tailbox.addRelativePoint(22,-8);
    this.tailbox.addRelativePoint(26,-8);
    this.blades.addRelativePoint(0,0);
    this.blades.addRelativePoint(19.6,3.1);
    this.blades.addRelativePoint(19.6,-3.1);
    this.blades.addRelativePoint(0,0);
    this.blades.addRelativePoint(-11.8,16.2);
    this.blades.addRelativePoint(-16.2,11.8);
    this.blades.addRelativePoint(0,0);
    this.blades.addRelativePoint(-16.2,-11.8);
    this.blades.addRelativePoint(-11.8,-16.2);
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
    this.tailbox.translate(this.movement);
    this.blades.translate(this.movement);
    this.gun.translate(this.movement);
  }

  applyRotation() {
    this.blades.rotateBody(this.rot + 0.25);
    this.hitbox.rotateBody(this.rot);
    this.tailbox.rotateBody(this.rot);
  }

  update() {
    this.applyMovement();
    this.applyRotation();
    this.calculate();
    return super.update();
  }

  //code for movement and most actions
  calculate() {
    let mvecs = [];
    super.setPkt(Status.GRAB,"SOLID");
    let i = 0;
    if(super.getResp()[0]){
    let data = super.getResp()[0];
    data.forEach(element => {
      if(PVector.getDistance(this.pos,element.pos) < 64){
        let mtv = Polygon.isColliding(this.hitbox,element.hitbox);
        if(mtv){
          mvecs.push(element.hitbox);
        }
      }
    });
    }
    if(mvecs.length > 0){;
      this.rot *= -1;
      this.movement.scale(-1);
      this.applyMovement();
      this.applyRotation();
      this.movement.scale(-1);
      this.rot *= -1;
    }
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
    this.tailbox.render(ctx);
    this.blades.render(ctx);

    this.gun.render(ctx);
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
  exit() {}
}
