export default class Scene {
    constructor(document) {
      this.canvas = document;
      addEvent(document, "keypress", keypress);
      addEvent(document, "click", click);
    }

    keypress() {
      if (event.key == 'w') {
        console.log("w");
        return 1;
      } else if (event.key == 'a') {
        console.log("a");
        return 2;
      } else if (event.key == 's') {
        console.log("s");
        return 3;
      } else if (event.key == 'd') {
        console.log("d");
        return 4;
      }
    }

    click() {
      console.log("click");
      return 5;
    }
}
