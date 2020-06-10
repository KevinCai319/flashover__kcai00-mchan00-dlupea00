import PVector from './PVector.js'
export default class Polygon{
    DEFAULT_COLOR = "#FF0000";
    vertices = [new PVector(Number,Number)];
    pos = new PVector();
    constructor(pos){
        this.vertices = [];
        this.pos = pos;
    }
    addPoint(x,y){
        this.vertices.push(new PVector(x,y));
    }
    rotateBody(deg){

    }
    render(ctx){
        ctx.fillStyle = this.DEFAULT_COLOR;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x,this.vertices[0].y);
        for(let i = 1; i < this.vertices.length; i++){
            ctx.lineTo(this.vertices[i].x,this.vertices[i].y);
        }
        ctx.lineTo(this.vertices[0].x,this.vertices[0].y);
        ctx.fill();
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