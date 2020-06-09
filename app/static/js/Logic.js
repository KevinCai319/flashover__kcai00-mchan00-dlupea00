//PHYSICS
class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static sub(vec) {
    return new PVector(this.x - vec.x, this.y - vec.y);
  }
  static add(vec) {
    return new PVector(this.x + vec.x, this.y + vec.y);
  }
  static perp(vec) {
    let tmp = vec.x;
    vec.x = -vec.y;
    vec.y = tmp;
  }
  static normalize(vec) {
    let len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    vec.x /= len;
    vec.y /= len;
  }
  static normal(vec1, vec2) {
    return normalize(perp(vec1.sub(vec2)));
  }
  static dot(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
  }
}

class AABB {}

class Polygon {}

class GameObject {
  constructor() {
    this.init();
  }
  init() {
    return 0;
  }
  update() {
    return 0;
  }
  render(ctx) {}
  exit() {}
}

class Tile extends GameObject {
  constructor(x, y, id) {
    super();
  }
  init() {
    return 0;
  }
  update() {
    return 0;
  }
  render(ctx) {}
  exit() {}
}

class Scene {
  constructor() {
    this.init();
  }
  init() {
    return 0;
  }
  update() {
    return 0;
  }
  exit() {}
}

// SCENES

//This Scene was used to debug the game handler.
class DemoScene extends Scene {
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

//This Scene is used to test physics and general gameplay before making formal levels.
class DebugScene extends Scene {
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
const status = {
  ERROR: "error",
  GOOD: "good",
};
class GameHandler {
  DEFAULT_SCENE = 0;
  constructor(draw) {
    this.draw = draw;
    this.cScene = new Scene();
    this.state = status.GOOD;
    this.listen = 0;
    this.loadScene(this.DEFAULT_SCENE);
  }
  getScene(id) {
    switch (id) {
      case 0:
        return new DemoScene();
      case 2:
        return new DebugScene();
    }
  }
  loadScene(id) {
    this.cScene = this.getScene(id);
    this.listen = this.cScene.init();
    //if initalized sucessfully then this code normally shouldn't trigger
    if (this.listen) {
      this.handleSignal(this.listen);
    }
  }

  handleSignal(code) {
    switch (code) {
      //Error
      case 1:
        console.log("error found");
        break;
      default:
        //clean up other garbage
        this.cScene.exit();
        //load new Scene
        this.loadScene(code);
        break;
    }
  }
  update() {
    this.listen = this.cScene.update();
    //If scene returns 0, means normal operation This also means that people should never reach demo scene.
    if (this.listen) {
      this.handleSignal(this.listen);
    }
  }
}

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
// Start things off
var handler = new GameHandler(ctx);
function main() {
  handler.update();
  requestAnimationFrame(main);
}
requestAnimationFrame(main);
