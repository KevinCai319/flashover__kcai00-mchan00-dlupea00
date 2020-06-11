import GameObject from './GameObject.js'
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
        for(let i = this.objects.length; i > 0; i--){
            let signal = this.objects[i].update();
            if(signal){
                this.handleSignal(signal);
            }
        }
        while(tbd.length) {
            this.objects.splice(tbd.pop(), 1);
        }
        while(tbc.length){
            this.objects.push(tbc.pop());
        }
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].render(ctx);
        }
        return 0;
    }
    push(obj){
        this.tbc.push(obj);
    }
    destroy(idx){
        this.tbd.push(idx);
    }
    log(msg){
        console.log(msg);
    }
    handleSignal(){}
    exit() {}
}
