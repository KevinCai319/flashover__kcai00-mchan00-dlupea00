import GameObject from "../GameObject.js";
import Tank from "./Tank.js";
import PVector from "../Physics/PVector.js";
import Polygon from "../Physics/Polygon.js";
import Status from "../Status.js";

const DISTANCE_FROM_GUN = 35;
const BOUNCES = 2;
const BULLET_THICKNESS = 3;
export default class Bullet extends GameObject {
  pos = new PVector();
  movement = new PVector();
  hitbox = new Polygon();
  tankid = 0;
  bounces = BOUNCES;
  constructor(tankid, pos, rotation) {
    super();
    this.addType("SOLID");
    this.addType("BULLET");
    this.tankid = tankid;
    this.bounces = BOUNCES;
    this.init(pos,rotation);
  }
  init(pos, rotation) {
    let tmp = PVector.getUnitVec(rotation);
    tmp.scale(DISTANCE_FROM_GUN);
    this.pos = PVector.add(pos, tmp);
    this.hitbox = new Polygon(PVector.copy(this.pos));
    this.hitbox.addRelativePoint(0, 0);
    this.hitbox.addRelativePoint(-4, -BULLET_THICKNESS);
    this.hitbox.addRelativePoint(-10, -BULLET_THICKNESS);
    this.hitbox.addRelativePoint(-10, BULLET_THICKNESS);
    this.hitbox.addRelativePoint(-4, BULLET_THICKNESS);
    this.movement = PVector.getUnitVec(rotation);
    this.movement.scale(4);
    this.hitbox.rotateBody(rotation);
    this.pos = new PVector(
      this.hitbox.vertices[0].x,
      this.hitbox.vertices[0].y
    );
    this.collisionCheck();
  }
  translate(){
    this.pos.translate(this.movement);
    this.hitbox.translate(this.movement);
  }
  end(){
    new Audio('/static/Assets/Audio/launch.wav').play();
    super.setPkt(Status.ADDBULLET,this.tankid);
    super.setPkt(Status.DELETE);
  }
  killTank(id){
    super.setPkt(Status.DELETE, id);
  }
  bounceWall(mtv,element){
    // let dot = PVector.dot(mtv, this.movement);
    // let sub = PVector.getScalar(mtv)*PVector.getScalar(this.movement);
    // let ang = Math.abs(dot/sub);
    // console.log("raw")
    // console.log(dot/sub);
    // if(ang > Math.PI){
    //   ang = Math.acos(ang-Math.PI);
    // }else{
    //   ang = Math.acos(ang);
    // }
    // console.log("ang")
    // console.log(ang * 180/Math.PI);
    // PVector.getUnitVec(ang);
    // let tmp = PVector.getAngle(this.movement);
    // tmp +=ang;
    if(Math.abs(mtv.y) > Math.abs(mtv.x)){
      this.movement.y *= -1;
    }else{
      this.movement.x *= -1;
    }
    let angle = PVector.getAngle(this.movement);
    //change bullet orientation
    this.hitbox.rotateAbsolute(angle);
    let i = 0;
    //speed limiter
    if(PVector.getScalar(this.movement) > 4){
      this.movement = PVector.getUnitVec(this.movement).scale(4);
    }
    while(Polygon.isColliding(this.hitbox,element.hitbox) && i < 8){
      this.translate();
      i+=1;
    }
    //prevents bullets from being shot in walls
    if(i == 12){
      this.end();
      return;
    }
  }
  collisionCheck(){
    let testCollision = super.getResp();
    //get some solids to test
    super.setPkt(Status.GRAB,"SOLID");
    testCollision.forEach(element => {
      //filter for objects nearby
      if(Math.abs(this.pos.x-element.pos.x) < 64){
        let mtv = Polygon.isColliding(this.hitbox,element.hitbox);
        if(mtv){
          this.hitbox.color = "#FFFFFF";
          if(element.type.includes("TILE")){
            //check if bounced before
            if(this.bounces){
              //play bounce sound
              new Audio('/static/Assets/Audio/bounce.wav').play();
              this.bounceWall(mtv,element);
              this.bounces--;
            }else{
              this.end();
            }
          }else{
            if(element.type.includes("TANK")){
              this.killTank(element.id);
            }
            this.end();
          }
        }
      }
    });
    super.clearResp();
  }
  update() {
    this.translate();
    if (
      this.pos.x < 0 ||
      this.pos.x > 960 ||
      this.pos.y < 0 ||
      this.pos.y > 480
    ) {
      this.end();
    }else{
      this.collisionCheck();
    }
    return super.update();
  }
  render(ctx) {
      ctx.lineWidth = 0;
      this.hitbox.render(ctx);
  }
}
