import '/src/sass/style.scss'

// import calcScroll from './modules/calcScroll';
// import scrollUp from './modules/scrollUp';
import headerCarousel from './modules/header-carousel';
import burger from './modules/burger';

document.addEventListener('DOMContentLoaded', () => {
'use stricti';

// scrollUp();
// calcScroll();

burger();
headerCarousel();
});