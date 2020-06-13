import PVector from './Physics/PVector.js';
export default class Input{
    constructor() {
        document.addEventListener("keypress", this.keypress);
        document.addEventListener ("keyup", this.keyup);
        document.addEventListener( "mousedown", this.mousedown);
        document.addEventListener("mouseup", this.mouseup);
        document.addEventListener("mousemove", this.mouse);
    }
    keydown(key) {
        return localStorage.getItem(key) === 'true';
    }
    keypress() {
        if (event.key == 'w') {localStorage.setItem('w','true')}
        else if (event.key == 'a') {localStorage.setItem('a','true')}
        else if (event.key == 's') {localStorage.setItem('s','true')}
        else if (event.key == 'd') {localStorage.setItem('d','true')}
    }
    keyup() {
        if (event.key == 'w') {localStorage.setItem('w','false')}
        else if (event.key == 'a') {localStorage.setItem('a','false')}
        else if (event.key == 's') {localStorage.setItem('s','false')}
        else if (event.key == 'd') {localStorage.setItem('d','false')}
    }
    mousedown() {localStorage.setItem('mouse','clicked')}
    mouseup() {localStorage.setItem('mouse','up')}
    mouse(){
        let a = document.getElementById('game').getBoundingClientRect();
        localStorage.setItem('mouseX',event.clientX-a.left-30);
        localStorage.setItem('mouseY',event.clientY-a.top-30);
    }
    getMouse(){
        return new PVector(parseInt(localStorage.getItem('mouseX')),parseInt(localStorage.getItem('mouseY')));
    }
    clicked() {
        if(localStorage.getItem('mouse') === 'clicked'){
            localStorage.setItem('mouse','hold');
            return true;
        }
        return false;
    }
}
