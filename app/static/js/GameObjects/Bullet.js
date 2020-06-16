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
  constructor(tankid, pos, rotation) {
    super();
    this.addType("SOLID");
    this.addType("BULLET");
    this.tankid = tankid;
    this.init(pos,rotation);
  }
  init(pos, rotation) {
    let tmp = PVector.getUnitVec(rotation);
    tmp.scale(45);
    this.pos = PVector.add(pos, tmp);
    this.hitbox = new Polygon(PVector.copy(this.pos));
    this.hitbox.addRelativePoint(0, 0);
    this.hitbox.addRelativePoint(-5, 2);
    this.hitbox.addRelativePoint(-15, 2);
    this.hitbox.addRelativePoint(-15, -2);
    this.hitbox.addRelativePoint(-5, -2);
    this.movement = PVector.getUnitVec(rotation);
    this.movement.scale(4);
    this.hitbox.rotateBody(rotation);
    // this.pos.translate(this.movement);
    this.pos = new PVector(
      this.hitbox.vertices[0].x,
      this.hitbox.vertices[0].y
    );
  }
  update() {
    this.pos.translate(this.movement);
    this.hitbox.translate(this.movement);
    if (
      this.pos.x < 0 ||
      this.pos.x > 960 ||
      this.pos.y < 0 ||
      this.pos.y > 480
    ) {
      super.setPkt(Status.ADDBULLET,this.tankid);
      super.setPkt(Status.DELETE);
    }else{
      let testCollision = super.getResp();
      super.setPkt(Status.GRAB,"SOLID");
      testCollision.forEach(element => {
        if(PVector.getDistance(this.pos,element.pos) < 64 && element.type.includes("TANK") && !element.type.includes("PLAYER")){
          super.setPkt(Status.DELETE, element.id);
          super.setPkt(Status.ADDBULLET,this.tankid);
          super.setPkt(Status.DELETE);
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
