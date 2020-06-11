import GameObject from './GameObject.js'
export default class Scene {
    objects = [new GameObject()];
    constructor() {
        this.objects = [];
        this.init();
    }
    init() {
        return 0;
    }
    update(ctx) {
        for(let i = 0; i < this.objects.length; i++){
            let signal = this.objects[i].update();
            if(signal){
                this.handleSignal(signal);
            }
        }
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].render(ctx);
        }
        return 0;
    }
    push(obj){
        this.objects.push(obj);
    }
    log(msg){
        console.log(msg);
    }
    handleSignal(){}
    exit() {}
}
