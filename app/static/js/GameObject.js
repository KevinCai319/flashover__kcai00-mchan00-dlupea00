import Scene from "./Scene.js";

export default class GameObject {
    resp = [];
    obj = [];
    constructor(sc) {
      this.scene = sc;
      this.obj = [];
    }
    init() {
      return 0;
    }
    update() {
      return 0;
    }
    getScene(){
      return this.scene;
    }
    getPkt(){
      
    }
    render(ctx) {}
    exit() {}
  }