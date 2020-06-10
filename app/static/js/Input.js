export default class Scene {
    constructor(document) {
      this.canvas = document;
      addEvent(document, "keypress", keypress);
    }

    function keypress() {
      if (event.key == 'w') {
        console.log("w");
      } else if (event.key == 'a') {
        console.log("a");
      } else if (event.key == 's') {
        console.log("s");
      } else if (event.key == 'd') {
        console.log("d");
      }
    }
}
