import Scene from '../Scene.js';
//This Scene is used to test physics and general gameplay before making formal levels.
export default class DebugScene extends Scene {
    constructor() {
      super();
      this.objects = [];
      this.counter = 0;
    }
    init() {
      //add whatever boxes/tanks/etc..
      return 0;
    }
    update() {
      console.log(
        "game loop is running fine on scene 2" + toString(this.counter)
      );
      this.counter++;
      if (this.counter < 10000) {
        return 0;
      } else {
        return 0;
      }
    }
    exit() {}
  }