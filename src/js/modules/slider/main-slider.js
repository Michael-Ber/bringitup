import Slider from "./slider";
export default class MainSlider extends Slider {
    constructor(btns, navPrev, navNext) {
        super(btns, navPrev, navNext);
    }
    showSlides(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1;
        }

        if(n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0'; // paragraph 8
            if(n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            }else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e) {}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('actual');
        });
        this.slides[this.slideIndex-1].style.display = 'block';
        this.slides[this.slideIndex-1].classList.add('animated', 'fadeIn', 'actual');

        
    }

    plusSlide(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindtriggers() {
        if(this.container){ // чтобы не было ошибки, т.к один класс .next для sliderLoan и sliderModules
            try {
                this.hanson = document.querySelector('.hanson');
            }catch(e) {}
    
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.plusSlide(1);
                });
                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSlides(this.slideIndex = 1);
                });
            });

            this.navPrev.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.plusSlide(-1);
            });
                
            });
            this.navNext.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.plusSlide(1);
                });
            });

    
            this.showSlides(this.slideIndex);
        }
    }

    render() {
        this.bindtriggers();
    }
}