import GameObject from "../GameObject.js";
import Polygon from "../Physics/Polygon.js";
import PVector from "../Physics/PVector.js";
import Player from "./Player.js";
import Tank from "./Tank.js";
import Status from "../Status.js";
export default class Tile extends GameObject {
  tileID = 0;
  constructor(x, y, id) {
    super();
    this.pos = new PVector(x, y);
    this.tileID = id;
    this.hitbox = new Polygon(PVector.copy(this.pos));
    this.hitbox.stroke = false;
    this.addType("TILE");
    this.init();
  }
  init() {
    switch (this.tileID) {
      case 1:
        this.hitbox.color = "#000000";
        this.hitbox.addRelativePoint(16, 16);
        this.hitbox.addRelativePoint(16, -16);
        this.hitbox.addRelativePoint(-16, -16);
        this.hitbox.addRelativePoint(-16, 16);
        this.addType("SOLID");
        break;
      case 2:
        super.setPkt(Status.ADD, new Tank(this.pos.x, this.pos.y, 2));
        this.destroy();
        break;
      case 3:
        super.setPkt(Status.ADD, new Player(this.pos.x, this.pos.y, 4));
        this.destroy();
        break;
      case 4:
        this.addType("NODE");
        this.destroy();
        break;
      default:
        break;
    }
    return 0;
  }
  destroy() {
    this.tileID = 0;
    this.hitbox.destroy();
  }
  render(ctx) {
    this.hitbox.render(ctx);
  }
  exit() {}
}
