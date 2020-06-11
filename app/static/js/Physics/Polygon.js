import PVector from './PVector.js'
export default class Polygon{
    DEFAULT_COLOR = "#FF0000";
    DEFAULT_OUT_COLOR = "#000000";
    vertices = [new PVector(Number,Number)];
    pos = new PVector();
    rotation = 0.0;
    constructor(pos){
        this.vertices = [];
        this.pos = pos;
        this.color = this.DEFAULT_COLOR;
        this.outcolor = this.DEFAULT_OUT_COLOR;
        this.rotation = 0.0;
    }
    addPoint(x,y){
        this.vertices.push(new PVector(x,y));
    }
    addRelativePoint(x,y){
        this.vertices.push(new PVector(this.pos.x+x,this.pos.y+y));
    }
    destroy(){
        this.vertices = [];
    }
    rotateBody(deg){
        this.rotation += deg;
        if(this.rotation > 2 * Math.PI){
            this.rotation -= 2* Math.PI;
        }else if(this.rotation < 0){
            this.rotation += 2* Math.PI;
        }
        this.vertices.forEach(vec => {
            vec.rotate(this.pos, deg);
        });
    }
    rotateAbsolute(deg){
        this.rotateBody(-this.rotation);
        this.rotateBody(deg);
    }
    translate(tvec){
        this.pos.translate(tvec);
        this.vertices.forEach(vec => {
            vec.translate(tvec);
        });
    }
    render(ctx){
        if(this.vertices.length > 1){
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.outcolor;
            ctx.beginPath();
            ctx.moveTo(this.vertices[0].x,this.vertices[0].y);
            for(let i = 1; i < this.vertices.length; i++){
                ctx.lineTo(this.vertices[i].x,this.vertices[i].y);
            }
            ctx.lineTo(this.vertices[0].x,this.vertices[0].y);
            ctx.fill();
            ctx.stroke();
        }
    }
    static calculateProjection(p1, axis){
        let min = PVector.dot(axis,p1.vertices[0]);
        let max = min;
        for(let i = 1; i < p1.vertices.length; i++){
            let p = PVector.dot(axis,p1.vertices[i]);
            if(p < min){
                min = p;
            } else if(p > max){
                max = p;
            }
        }
        return new PVector(min,max);
    }
    static isColliding(p1,p2){
        let overlap = 0;
        let mtv = new PVector();
        let n1 = [];
        let n2 = [];
        //calculate normals of edges
        for(let i = 0; i < p1.vertices.length; i++){
            n1.push(PVector.normal(p1.vertices[i],p1.vertices[i+1]));
        }
        for(let i = 0; i < p2.vertices.length; i++){
            n2.push(PVector.normal(p2.vertices[i],p2.vertices[i+1]));
        }


    }
}