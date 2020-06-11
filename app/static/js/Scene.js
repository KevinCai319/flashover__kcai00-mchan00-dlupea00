import GameObject from "./GameObject.js";
export default class Scene {
  objects = [new GameObject()];
  //to be destroyed
  tbd = [new GameObject()];
  tbc = [new GameObject()];
  constructor() {
    this.objects = [];
    this.tbd = [];
    this.tbc = [];
    this.init();
  }
  init() {
    return 0;
  }
  update(ctx) {
    //remove old objects that were requested to be removed
    while (this.tbd.length) {
      this.objects.splice(this.tbd.pop(), 1);
    }
    //add new objects requested to be added
    while (this.tbc.length) {
      this.objects.push(this.tbc.pop());
    }

    //update objects
    for (let i = this.objects.length - 1; i != -1; i--) {
      let signal = this.objects[i].update();
      if (signal) {
        this.handleSignal(signal);
      }
    }
    //render objects
    this.objects.forEach((obj) => {
      obj.render(ctx);
    });
    return 0;
  }
  push(obj) {
    this.tbc.push(obj);
  }
  destroy(idx) {
    this.tbd.push(idx);
  }
  log(msg) {
    console.log(msg);
  }
  handleSignal() {}
  exit() {}
}
