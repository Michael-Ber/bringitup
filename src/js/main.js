import Slider from "./modules/slider.js";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next');
    slider.render();
});
