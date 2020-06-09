import PVector from './PVector'
export default class Polygon{
    DEFAULT_COLOR = "#FF0000";
    vertices = [new PVector()];
    constructor(){
        this.vertices = [];
    }
    addPoint(x,y){
        this.vertices.push(new PVector(x,y));
    }
    render(ctx){
        ctx.strokeStyle = this.DEFAULT_COLOR;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x,this.vertices[0].y);
        for(i = 1; i< this.vertices.length; i++){
            ctx.lineTo(this.vertices[i].x,this.vertices[i].y);
        }
        ctx.lineTo(this.vertices[0].x,this.vertices[0].y);
        ctx.fill();
    }
}