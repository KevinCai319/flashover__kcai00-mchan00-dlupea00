export default class GameObject {
    constructor(x,y) {
      this.init();
      this.x = x;
      this.y = y;
    }
    init() {
      return 0;
    }
    update() {
      return 0;
    }
    render(ctx) {}
    exit() {}
  }