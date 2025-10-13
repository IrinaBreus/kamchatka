import '/src/sass/style.scss';

import 'virtual:svg-icons-register';

// import calcScroll from './modules/calcScroll';
// import scrollUp from './modules/scrollUp';
import headerCarousel from './modules/header-carousel';
import burger from './modules/burger';
import menuScroll from './modules/menuScroll';
import miniCarousel from './modules/mini-carousels';
import form from './modules/form';

document.addEventListener('DOMContentLoaded', () => {
'use stricti';

// scrollUp();
// calcScroll();

menuScroll();
burger();
form('.application__form-main');

headerCarousel();
miniCarousel('.one__slider', 'right');
miniCarousel('.two__slider', 'left');
miniCarousel('.three__slider', 'left');
miniCarousel('.four__slider', 'right');
miniCarousel('.five__slider', 'left');
miniCarousel('.six__slider', 'right');
miniCarousel('.seven__slider', 'left');

});