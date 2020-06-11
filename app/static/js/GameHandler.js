import Scene from './Scene.js';
import DemoScene from './Scenes/DemoScene.js';
import Gameplay from './Scenes/Gameplay.js';
const status = {
    ERROR: "error",
    GOOD: "good",
};
export default class GameHandler {
    DEFAULT_SCENE = 2;
    constructor() {
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
          return new Gameplay();
      }
    }
    loadScene(id) {
      this.cScene = this.getScene(id);
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
    update(ctx) {
      this.listen = this.cScene.update(ctx);
      //If scene returns 0, means normal operation This also means that people should never reach demo scene.
      if (this.listen) {
        this.handleSignal(this.listen);
      }
    }
  }