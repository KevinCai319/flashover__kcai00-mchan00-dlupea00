export default class PVector {
    x = 0.0;
    y = 0.0;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    translate(vec){
      this.x += vec.x;
      this.y += vec.y;
    }
    scale(scale){
      this.x *= scale;
      this.y *= scale;
    }
    rotate(vec, rad){
      let diff = PVector.sub(this, vec);
      let tmp = diff.x;
      this.x = (diff.x)*Math.cos(rad)-(diff.y)*Math.sin(rad);
      this.y = (diff.y)*Math.cos(rad)+(tmp)*Math.sin(rad);
      this.translate(vec);
    }
    static getUnitVec(rad){
      let tmp = new PVector(1,0);
      tmp.rotate(new PVector(0,0), rad);
      return tmp;
    }
    static copy(vec){
      return new PVector(vec.x,vec.y);
    }
    static add(vec1 ,vec2) {
      return new PVector(vec1.x + vec2.x, vec1.y + vec2.y);
    }
    static sub(vec1, vec2) {
      return new PVector(vec1.x - vec2.x, vec1.y - vec2.y);
    }
    static perp(vec) {
      let tmp = vec.x;
      vec.x = -vec.y;
      vec.y = tmp;
    }
    static normalize(vec) {
      let len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      vec.x /= len;
      vec.y /= len;
    }
    static normal(vec1, vec2) {
      return normalize(perp(vec1.sub(vec2)));
    }
    static dot(vec1, vec2) {
      return vec1.x * vec2.x + vec1.y * vec2.y;
    }
  }