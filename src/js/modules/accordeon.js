export default class Accordeon {
    constructor(trigger, content) {
        this.btns = document.querySelectorAll(trigger);
        this.contents = document.querySelectorAll(content);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if(window.getComputedStyle(this.contents[i]).display !== 'block') {
                    this.contents[i].style.display = 'block';
                    this.contents[i].classList.add('animated', 'fadeInDown');
                }else {
                    this.contents[i].style.display = 'none';
                    this.contents[i].classList.remove('fadeInDown');
                }
                
            });
        });
    }

    init() {
        this.bindTriggers();
    }
}