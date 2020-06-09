import Scene from './Scene.js';

export default class DemoScene extends Scene {
    constructor() {
        super();
        this.counter = 0;
    }
    init() {
        return 1;
    }
    update() {
        console.log("game loop is running fine" + toString(this.counter));
        this.counter++;
        return 0;
    }
    exit() {}
}