import GameObject from '../GameObject.js';
import Polygon from '../Physics/Polygon.js';
import PVector from '../Physics/PVector.js';
import Player from './Player.js';
import Tank from './Tank.js';
export default class Tile extends GameObject {
    tileID = 0;
    constructor(sc,x, y, id) {
        super(sc);
        this.pos = new PVector(x,y);
        this.tileID = id;
        this.hitbox = new Polygon(x,y);
        this.init();
    }
    init() {
        if(this.tileID != 0){
            this.hitbox.addPoint(this.pos.x+16, this.pos.y + 16);
            this.hitbox.addPoint(this.pos.x+16, this.pos.y - 16);
            this.hitbox.addPoint(this.pos.x-16, this.pos.y - 16);
            this.hitbox.addPoint(this.pos.x-16, this.pos.y + 16);
        }
        let sc = super.getScene();
        switch(this.tileID){
            case 1:
                this.hitbox.color = "#000000";
                break;
            case 2:
                console.log('create tank');
                sc.push(new Tank(sc,this.pos.x,this.pos.y,2));
                this.destroy();
                break;
            case 3:
                console.log('create player');
                sc.push(new Player(sc,this.pos.x,this.pos.y,4));
                this.destroy();
                break;
            default:
                break;
        }
        return 0;
    }
    destroy(){
        this.tileID = 0;
        this.hitbox.destroy();
    }
    update() {
        return 0;
    }
    render(ctx) {
        this.hitbox.render(ctx);
    }
    exit() {}
}