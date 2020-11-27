export default class Slider {
    constructor({container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay
        } = {}) { // второй объет для того, чтобы не было ошибки при вызове пустого класса
        this.container = document.querySelector(container);
        this.slides = [];
        this.container.children.forEach(child => {
            if(child.tagName !== 'BUTTON') {
                this.slides.push(child);
            }
        });
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}