import GameObject from "./GameObject.js";
import Status from "./Status.js"
import Input from "./Input.js"
export default class Scene {
  objects = [GameObject];
  //to be destroyed
  tbd = [GameObject];
  //to be created
  tbc = [GameObject];
  lowest_id = 0;
  input = Input;
  constructor() {
    this.objects = [];
    this.tbd = [];
    this.tbc = [];
    this.input = new Input();
    this.init();
  }
  init() {
  }
  update(ctx) {
    //remove old objects that were requested to be removed
    while (this.tbd.length != 0) {
      let idx = this.tbd.pop();
      if(idx < this.lowest_id){
        this.lowest_id = idx;
      }
      this.objects[idx] = false;
    }
    //render objects
    this.objects.forEach((obj) => {
        if(obj){
          obj.render(ctx);
        }
    });
    this.cursor = this.input.getMouse();
    ctx.beginPath();
    ctx.arc(this.cursor.x, this.cursor.y, 5, 0, 2 * Math.PI);
    ctx.stroke();

    //add new objects requested to be added
    while (this.tbc.length) {
      this.objects[this.lowest_id] = this.tbc.pop();
      this.objects[this.lowest_id].id = this.lowest_id;
      this.lowest_id++;
      while(this.objects[this.lowest_id]){
        this.lowest_id++;
      }
    }

    //update objects
    for (let i = 0; i < this.objects.length; i++) {
      if(this.objects[i]){
        let req = this.objects[i].update();
        if (req.length) {
          this.handleFdbk(req,i);
        }
      }
    }
    return 0;
  }
  push(obj) {
    this.tbc.push(obj);
  }
  destroy(idx) {
    if(!this.tbd.includes(idx)){
      this.tbd.push(idx);
    }
  }
  log(msg) {
    console.log(msg);
  }
  handleRequest(req,i){
    switch(req.signal){
      case Status.OK:
        break;
      case Status.ADD:
          this.push(req.data);
        break;
      case Status.DELETE:
          let object = req.data;
          if(object){
            this.destroy(object);
          }else{
            this.destroy(i);
          }
        break;
      case Status.GRAB://Grab by tag
          let resp = [];
          this.objects.forEach(element => {
            if(element && element.type.includes(req.data) && this.objects[i] != element){
              resp.push(element);
            }
          });
          this.objects[i].setResp(resp);//send data back
        break;
      default:
          this.specHandle(req, i);
        break;
    }
  }
  specHandle(req, i){

  }
  handleFdbk(req, i) {
    req.forEach(request => {
      this.handleRequest(request,i);
    });
    this.objects[i].clearPkt();
  }
  exit() {}
}
