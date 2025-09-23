import '/src/sass/style.scss';

import 'virtual:svg-icons-register';

// import calcScroll from './modules/calcScroll';
// import scrollUp from './modules/scrollUp';
import headerCarousel from './modules/header-carousel';
import burger from './modules/burger';
import menuScroll from './modules/menuScroll';
import miniCarousel from './modules/mini-carousels';
import miniCarouselLeft from './modules/mini-carousels copy';

document.addEventListener('DOMContentLoaded', () => {
'use stricti';

// scrollUp();
// calcScroll();

menuScroll();
burger();
headerCarousel();
miniCarousel('.one__slider');
// miniCarousel('.two__slider');

miniCarouselLeft('.two__slider');

});