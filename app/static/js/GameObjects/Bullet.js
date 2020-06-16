import GameObject from "../GameObject.js";
import Tank from "./Tank.js";
import PVector from "../Physics/PVector.js";
import Polygon from "../Physics/Polygon.js";
import Status from "../Status.js";

export default class Bullet extends GameObject {
  pos = new PVector();
  movement = new PVector();
  hitbox = new Polygon();
  tankid = 0;
  bounces = 1;
  constructor(tankid, pos, rotation) {
    super();
    this.addType("SOLID");
    this.addType("BULLET");
    this.tankid = tankid;
    this.bounces = 1;
    this.init(pos,rotation);
  }
  init(pos, rotation) {
    let tmp = PVector.getUnitVec(rotation);
    tmp.scale(45);
    this.pos = PVector.add(pos, tmp);
    this.hitbox = new Polygon(PVector.copy(this.pos));
    this.hitbox.addRelativePoint(0, 0);
    this.hitbox.addRelativePoint(-4, 1);
    this.hitbox.addRelativePoint(-15, 1);
    this.hitbox.addRelativePoint(-15, -1);
    this.hitbox.addRelativePoint(-4, -1);
    this.movement = PVector.getUnitVec(rotation);
    this.movement.scale(4);
    this.hitbox.rotateBody(rotation);
    this.pos = new PVector(
      this.hitbox.vertices[0].x,
      this.hitbox.vertices[0].y
    );
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
    if(Math.abs(mtv.y) > Math.abs(mtv.x)){
      this.movement.y *= -1;
    }else{
      this.movement.x *= -1;
    }
    let angle = 0;
    if(this.movement.y){
      angle = Math.atan2(this.movement.y,this.movement.x);
    }
    this.hitbox.rotateAbsolute(angle);
    while(Polygon.isColliding(this.hitbox,element.hitbox)){
      this.translate();
    }
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
      let testCollision = super.getResp();
      //get some solids to test
      super.setPkt(Status.GRAB,"SOLID");
      testCollision.forEach(element => {
        if(PVector.getDistance(this.pos,element.pos) < 64){
          let mtv = Polygon.isColliding(this.hitbox,element.hitbox);
          if(mtv){
            this.hitbox.color = "#FFFFFF";
            if(element.type.includes("TILE")){
              if(this.bounces){
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
    return super.update();
  }
  getPolygons(){
    
  }
  render(ctx) {
      this.hitbox.render(ctx);
  }
}
