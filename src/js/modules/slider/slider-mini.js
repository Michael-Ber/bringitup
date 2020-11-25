import Slider from "./slider";

export default class SliderMini extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        this.bindTriggers();
        this.decorize();
        this.nextSlide();
    }

    decorize() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
           
        });
        this.slides[0].classList.add(this.activeClass);
        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            let active = this.slides.length - 1;
            this.container.insertBefore(this.slides[active], this.slides[0]);
            this.decorize();
        });
    }

    nextSlide() {
        this.next.addEventListener('click', () => {
            this.container.appendChild(this.slides[0]);
            this.decorize();
        });
        if(this.autoplay) {
            this.timerID = setInterval(() => {
                this.container.appendChild(this.slides[0]);
                this.decorize();
            }, 5000);
        }
    }

    opacityTrue(n) {
        this.slides[n].lastElementChild.style.opacity = '1';
        this.slides[n].firstElementChild.lastElementChild.style.opacity = '1';
        if(this.slides[n].parentNode.classList.contains('modules__content-slider')) {
            this.slides[n].lastElementChild.children.forEach(child => {
                child.firstElementChild.style.opacity = '1';
            });
        }
    }

    opacityFalse(elem) {
        elem.lastElementChild.style.opacity = '0.4';
        elem.firstElementChild.lastElementChild.style.opacity = '0';
    }
}