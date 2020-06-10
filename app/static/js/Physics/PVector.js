export default class PVector {
    x = 0.0;
    y = 0.0;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static sub(vec) {
      return new PVector(this.x - vec.x, this.y - vec.y);
    }
    static add(vec) {
      return new PVector(this.x + vec.x, this.y + vec.y);
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