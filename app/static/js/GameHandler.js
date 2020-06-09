import Scene from './Scene.js';
import DemoScene from './DemoScene.js';

export default class GameHandler {
    DEFAULT_SCENE = 0;
    constructor(canvas) {
        this.canvas = canvas;
        this.cScene = new Scene();
        this.state = status.GOOD;
        this.listen = 0;
        this.loadScene(this.DEFAULT_SCENE);
    }
    getScene(id) {
        switch (id) {
            case 0:
                return new DemoScene();
            case 1:
            case 2:
        }
    }
    loadScene(id) {
        this.cScene = this.getScene(id);
        console.log(toString(this.cScene));
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
        //If scene returns 0, means normal operation
        if (this.listen) {
            this.handleSignal(this.listen);
        }
    }
}