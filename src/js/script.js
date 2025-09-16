import '/src/sass/style.scss';

import 'virtual:svg-icons-register';

// import calcScroll from './modules/calcScroll';
// import scrollUp from './modules/scrollUp';
import headerCarousel from './modules/header-carousel';
import burger from './modules/burger';
import menuScroll from './modules/menuScroll';

document.addEventListener('DOMContentLoaded', () => {
'use stricti';

// scrollUp();
// calcScroll();

menuScroll();
burger();
headerCarousel();

});