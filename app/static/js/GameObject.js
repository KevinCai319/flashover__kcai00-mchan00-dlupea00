import Request from "./Request.js"
export default class GameObject {
    resp = [];
    obj = [Request];
    type = ["DEFAULT"];
    id = 0;
    constructor() {
      this.obj = [];
    }
    addType(str){
      this.type.push(str);
    }
    update() {
      return this.obj;
    }
    setPkt(signal,data){
      this.obj.push(new Request(signal,data));
    }
    setResp(resp){
      this.resp = resp;
    }
    getResp(){
      return this.resp;
    }
    clearResp(){
      this.resp = [];
    }
    clearPkt(){
      this.obj = [];
    }
    render(ctx) {}
    exit() {}
  }