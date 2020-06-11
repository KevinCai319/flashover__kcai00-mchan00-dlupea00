export default class Scene {
    constructor(document) {
        this.canvas = document;
        addEvent(document, "keypress", keypress);
        addEvent(document, "keyup", keyup);
        addEvent(document, "mousedown", mousedown);
        addEvent(document, "mouseup", mouseup);

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;

        this.mouse = false;
    }
    keypress() {
        if (event.key == 'w') {this.w = true;}
        else if (event.key == 'a') {this.a = true;}
        else if (event.key == 's') {this.s = true;}
        else if (event.key == 'd') {this.d = true;}
    }
    keyup() {
        if (event.key == 'w') {this.w = false;}
        else if (event.key == 'a') {this.a = false;}
        else if (event.key == 's') {this.s = false;}
        else if (event.key == 'd') {this.d = false;}
    }
    mousedown() {mouse = true;}
    mouseup() {mouse = false;}

    keydown(key) {
        if (key == 'w') {return this.w;}
        else if (key == 'a') {return this.a;}
        else if (key == 's') {return this.s;}
        else if (key == 'd') {return this.d;}
    }
    clicked() {return this.mouse;}
}
