import '/src/sass/style.scss';

import 'virtual:svg-icons-register';

// import calcScroll from './modules/calcScroll';
import scrollUp from './modules/scrollUp';
import headerCarousel from './modules/header-carousel';
import burger from './modules/burger';
import menuScroll from './modules/menuScroll';
import miniCarousel from './modules/mini-carousels';
import form from './modules/form';
import modals from './modules/modals';

document.addEventListener('DOMContentLoaded', () => {
    'use stricti';

    headerCarousel(); //слайдер для header

    // получение текущего года
    const year = document.querySelector('.footer__date span');
    year.innerHTML = new Date().getFullYear();

    scrollUp();
    // calcScroll();

    menuScroll(); //изменение вида меню при скроле
    burger();
    form('.application__form-main');
    form('.modal__form-main');
    modals();

    // небольшие слайдеры по сайту
    miniCarousel('.one__slider', 'right');
    miniCarousel('.two__slider', 'left');
    miniCarousel('.three__slider', 'left');
    miniCarousel('.four__slider', 'right');
    miniCarousel('.five__slider', 'left');
    miniCarousel('.six__slider', 'right');
    miniCarousel('.seven__slider', 'left');

});