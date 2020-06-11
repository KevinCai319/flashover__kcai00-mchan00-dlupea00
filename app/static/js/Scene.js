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
  }
  update(ctx) {
    //remove old objects that were requested to be removed
    // console.log(this.tbd);
    while (this.tbd.length != 0) {
        console.log(this.objects[this.tbd[this.tbd.length-1]]);
      this.objects.splice(this.tbd.pop(), 1);
    //   console.log(this.tbd.length);
    }
    //render objects
    this.objects.forEach((obj) => {
        obj.render(ctx);
    });
    //add new objects requested to be added
    while (this.tbc.length) {
      this.objects.push(this.tbc.pop());
    }

    //update objects
    for (let i = this.objects.length - 1; i != -1; i--) {
      let signal = this.objects[i].update();
      if (signal) {
        this.handleSignal(signal,i);
      }
    }
    return 0;
  }
  rpush(obj){
      this.objects.push(obj);
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
  handleSignal(signal, i) {}
  exit() {}
}
