import Scene from "./Scene.js";

export default class GameObject {
    resp = [];
    obj = [];
    constructor(sc) {
      this.scene = sc;
      this.obj = [];
    }
    update() {
      return 0;
    }
    getScene(){
      return this.scene;
    }
    setPkt(obj){
      this.obj.push(obj);
    }
    getPkt(){
      return this.obj;
    }
    render(ctx) {}
    exit() {}
  }