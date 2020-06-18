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
        15,
        30,
        480,
        960,
        "111111111111111111111111111111110000000011111110000000001111104000000011111110000200001111100000000011111110000000001111100000000011111110000000040001100000000400011110000000000001100000000000400004004000400001100000000000000000000111000401100040000004000000000111000011100001111110000000000111004011100001111110000400400111000111100001111110000011004000440111103001111110004011000000001111100001111110000111000000001111111111111111111111111111111111"
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
