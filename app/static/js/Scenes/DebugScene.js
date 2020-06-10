import Scene from './../Scene.js';
import GameObject from './../GameObject.js';
import Tank from './../GameObjects/Tank.js';
//This Scene is used to test physics and general gameplay before making formal levels.
export default class DebugScene extends Scene {
    DEFAULT_COLOR = "#F9E4B7";
    objects = [new GameObject()];
    constructor() {
      super();
      this.objects = [];
      this.counter = 0;
    }
    init() {
      //add whatever boxes/tanks/etc..
      this.objects = [];
      this.objects.push(new Tank(300,300));
      this.objects.push(new Tank(400,300));
      return 0;
    }
    setBackground(ctx, color){
        ctx.fillStyle = color;
        ctx.fillRect(0,0,960,480);
    }
    update(ctx) {
      this.setBackground(ctx, this.DEFAULT_COLOR);
      console.log(
        "game loop is running fine on scene 2" + this.counter.toString(10)
      );

      for(let i = 0; i < this.objects.length; i++){
        this.objects[i].update();
      }
      for(let i = 0; i < this.objects.length; i++){
        this.objects[i].render(ctx);
      }
    //   this.counter++;
    //   if (this.counter < 10000) {
    //     return 0;
    //   } else {
    //     return 0;
    //   }
      return 0;
    }
    exit() {}
  }