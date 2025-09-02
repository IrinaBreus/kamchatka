import '/src/sass/style.scss'

import calcScroll from './modules/calcScroll';
import scrollUp from './modules/scrollUp';

document.addEventListener('DOMContentLoaded', () => {
'use stricti';

scrollUp();
calcScroll();
});