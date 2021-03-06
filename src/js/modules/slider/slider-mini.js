import Slider from "./slider";

export default class SliderMini extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    init() {
        try{
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorize();
            if(this.autoplay) {
                this.container.addEventListener('mouseover', () => {
                    clearInterval(this.timerID);
                });
                this.container.addEventListener('mouseout', () => {
                    this.nextByInterval();
                }); 
            }
        }catch(e){}
        
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
        this.nextSlide();
        this.prevSlide();
    }

    nextSlide() {
        this.next.addEventListener('click', () => {
            for(let i = 1; i < this.slides.length-1; i++) {
                if(this.slides[i].tagName !== 'BUTTON') {
                    this.container.appendChild(this.slides[0]);
                    this.decorize();
                    break;
                }else {
                    this.container.appendChild(this.slides[i]);
                    i--;
                }
            }
            
            // this.container.appendChild(this.slides[0]);
            // this.nextArrElem(this.slides);
            // this.decorize();
        });
        document.querySelector('.difference .next').addEventListener('click', () => {
            this.nextByInterval();
            
        });
    }

    prevSlide() {
        this.prev.addEventListener('click', () => {
            for(let i = this.slides.length-1; i > 0; i--) {
                if(this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorize();
                    break;
                }
            }
            // let active = this.slides.length - 1;
            // this.container.insertBefore(this.slides[active], this.slides[0]);
            // this.prevArrElem(this.slides);
            // this.decorize();
        });
    }

    nextArrElem(arr) {
        let firstElem = arr.shift();
        arr.push(firstElem);
    }
    prevArrElem(arr) {
        let lastElem = arr.pop();
        arr.unshift(lastElem);
    }

    nextByInterval() {
        if(this.autoplay) {
            this.timerID = setInterval(() => {
                this.container.appendChild(this.slides[0]);
                // this.nextArrElem(this.slides);
                this.decorize();
            }, 5000);
        }
    }
}