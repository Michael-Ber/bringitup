import MainSlider from "./modules/slider/main-slider.js";
import SliderMini from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/videoPlayer";
import Difference from "./modules/difference";
import Form from "./modules/form";

window.addEventListener('DOMContentLoaded', () => {

    const sliderLoan = new MainSlider({container: '.page', btns: '.next'});
	sliderLoan.render();
	
	const sliderModules = new MainSlider({container: '.moduleapp', btns: '.next', navPrev: '.prevmodule', navNext: '.nextmodule'});
	sliderModules.render();

    const showUpSlider = new SliderMini({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
		animate: true
	});
	showUpSlider.init();

	const modulesSlider = new SliderMini({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		animate: true,
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new SliderMini({
		container: '.feed__slider',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active'
	});
	feedSlider.init();

	new Difference('.officerold', '.officernew', '.officer__card-item').init();
   
    const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();
	
	new Form('.join__evolution .form').init();
	new Form('.schedule__form .form').init();

});
