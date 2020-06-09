import Scene from '../Scene.js';

export default class DemoScene extends Scene {
    constructor() {
      super();
      this.counter = 0;
    }
    init() {
      return 0;
    }
    update() {
      console.log(
        "game loop is running fine on scene 0" + toString(this.counter)
      );
      this.counter++;
      if (this.counter < 10000) {
        return 0;
      } else {
        return 2;
      }
    }
    exit() {}
  }