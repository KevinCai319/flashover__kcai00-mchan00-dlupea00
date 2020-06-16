import Scene from "../Scene.js";
import Map from "../GameObjects/Map.js";
import Status from "../Status.js";
//This Scene is used to test physics and general gameplay before making formal levels.
export default class Gameplay extends Scene {
  DEFAULT_COLOR = "#F9E4B7";
  counter = 0;
  map = Map;
  constructor() {
                  super();
                  this.counter = 0;
                }
  init() {
    this.map =
      new Map(
        480,
        960,
        "111111111111111111111111111111100000000000000001000000000001100000000000000001000000010001100000001000000001002000000001100000000000000001000000000001100000000000000001000000000001100000000000000001111000000001100000000000000000000000200001100000000111100000000000000001100000000000100000000000000001100000000000100000000000000001100030000000100000200000000001100000000000100000000000100001100000000000100000000001200001111111111111111111111111111111"
      );
    super.push(this.map);
    return 0;
  }
  specHandle(req, i){
    switch(req.signal){
      case Status.ADDBULLET:
        //this if statement is needed to account for shots beyond the grave
        if(this.objects[req.data]){
          this.objects[req.data].availableBullets++;
        }
        break;
      default:
        break;
    }
  }
  push(obj) {
    super.push(obj);
  }
  setBackground(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 960, 480);
  }
  update(ctx) {
    this.setBackground(ctx, this.DEFAULT_COLOR);
    super.update(ctx);
    this.counter++;
    return 0;
  }
  exit() {}
}
