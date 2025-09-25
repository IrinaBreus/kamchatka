// const miniCarousel = (selectCarousel, pos) => {
//     const carousel = document.querySelector(selectCarousel),
//           field = carousel.querySelector('.slider__field'),
//           slides = field.children,
//           btnPrev = carousel.querySelector('.carousel__btn-prev'),
//           btnNext = carousel.querySelector('.carousel__btn-next');

//     let gap, slideWidth, currentPos = 0;
//     let isAnimating = false;

//     const leftSliders = document.querySelectorAll('.left');
//     leftSliders.forEach(item => {
//         item.classList.remove('left');
//         item.classList.add('right');
//     });
//     pos === 'left' ? pos === 'right' : pos =='right';
//     // Конфигурация для разных направлений
//     const directions = {
//         right: { 
//             n: 1,
//             getIndices: (slides, isNext) => ({
//                 largeIndex: isNext ? 1 : 0,    // Какой слайд увеличиваем
//                 removeIndex: isNext ? 0 : slides.length - 1  // С какого слайда убираем класс
//             }),
//             getOperations: (isNext) => ({
//                 clone: isNext ? 'append' : 'prepend',    // Куда вставляем клон
//                 original: isNext ? 'append' : 'prepend'  // Куда возвращаем оригинал
//             }),
//             getTargetSlide: (slides, isNext) => 
//                 isNext ? slides[0] : slides[slides.length - 1],
//             calculateSlideWidth: (slides, gap) => slides[0].offsetWidth + gap
//         },
//         left: {
//             n: -1,
//             getIndices: (slides, isNext) => ({
//                 largeIndex: slides.length - 1,
//                 removeIndex: slides.length - 1
//             }),
//             getOperations: (isNext) => ({
//                 clone: isNext ? 'prepend' : 'append',
//                 original: isNext ? 'prepend' : 'append'
//             }),
//             getTargetSlide: (slides, isNext) => 
//                 isNext ? slides[slides.length - 1] : slides[0],
//             calculateSlideWidth: (slides, gap) => slides[slides.length - 1].offsetWidth + gap
//         }
//     };

//     const config = directions[pos];

//     // Функция для обновления размеров
//     function updateSizes() {
//         gap = parseInt(window.getComputedStyle(field).gap);
//         slideWidth = config.calculateSlideWidth(slides, gap);
//         field.style.transform = `translateX(${currentPos}px)`;
//     }

//     // Функция для блокировки/разблокировки кнопок
//     function toggleButtons(disabled) {
//         btnPrev.disabled = disabled;
//         btnNext.disabled = disabled;
        
//         if (disabled) {
//             btnPrev.classList.add('disabled');
//             btnNext.classList.add('disabled');
//         } else {
//             btnPrev.classList.remove('disabled');
//             btnNext.classList.remove('disabled');
//         }
//     }

//     // Общая функция для анимации слайда
//     function animateSlide(direction) {
//         if (isAnimating) return;
        
//         updateSizes();
//         isAnimating = true;
//         toggleButtons(true);
        
//         const isNext = direction === 'next';
        
//         // Получаем все необходимые параметры из конфига
//         const targetSlide = config.getTargetSlide(slides, isNext);
//         const operations = config.getOperations(isNext);
//         const indices = config.getIndices(slides, isNext);

//         // 1. Создаем клон и добавляем в нужное место
//         const cloneSlide = targetSlide.cloneNode(true);
//         field[operations.clone](cloneSlide);
        
//         if (isNext) {
//             // Логика для next (движение ВЛЕВО)
//             currentPos -= slideWidth * config.n;

//             field.style.transform = `translateX(${currentPos}px)`;
//             slides[indices.largeIndex].classList.add('large');
            
//             setTimeout(() => {
//                 field.style.transition = 'none';
//                 field[operations.original](targetSlide);
//                 field.removeChild(cloneSlide);
//                 currentPos += slideWidth * config.n;
//                 field.style.transform = `translateX(${currentPos}px)`;
//                 slides[indices.removeIndex].classList.remove('large');
                
//                 setTimeout(() => {
//                     field.style.transition = '';
//                     isAnimating = false;
//                     toggleButtons(false);
//                 }, 50);
//             }, 600);
//         } else {
//             // Логика для prev (движение ВПРАВО)
//             field.style.transition = 'none';
//             currentPos -= slideWidth * config.n;
//             field.style.transform = `translateX(${currentPos}px)`;
            
//             setTimeout(() => {
//                 field.style.transition = '';
//                 currentPos += slideWidth * config.n;
//                 field.style.transform = `translateX(${currentPos}px)`;
                
//                 setTimeout(() => {
//                     field.style.transition = 'none';
//                     field[operations.original](targetSlide);
//                     field.removeChild(cloneSlide);
                    
//                     setTimeout(() => {
//                         field.style.transition = '';
//                         isAnimating = false;
//                         toggleButtons(false);
//                     }, 50);
//                 }, 600);
//             }, 50);
//         }
//     }

//     // Обработчик изменения размера окна
//     let resizeTimeout;
//     function handleResize() {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             if (!isAnimating) {
//                 updateSizes();
//             }
//         }, 250);
//     }

//     // Добавляем обработчики событий
//     btnNext.addEventListener('click', () => animateSlide('next'));
//     btnPrev.addEventListener('click', () => animateSlide('prev'));
//     window.addEventListener('resize', handleResize);

//     // Инициализация
//     updateSizes();

//     return {
//         destroy: () => {
//             window.removeEventListener('resize', handleResize);
//             btnNext.removeEventListener('click', () => animateSlide('next'));
//             btnPrev.removeEventListener('click', () => animateSlide('prev'));
//         }
//     };
// }

// export default miniCarousel;

const miniCarousel = (selectCarousel, pos) => {
    const carousel = document.querySelector(selectCarousel),
          field = carousel.querySelector('.slider__field'),
          slides = field.children,
          btnPrev = carousel.querySelector('.carousel__btn-prev'),
          btnNext = carousel.querySelector('.carousel__btn-next');

    let gap, slideWidth, currentPos = 0;
    let isAnimating = false;
    let currentDirection = pos; // Текущее направление

    // Функция для смены направления
    function updateDirection() {
        const isMobile = window.innerWidth < 992;
        
        if (isMobile) {
            // На мобильных все слайдеры становятся 'right'
            carousel.classList.remove('left');
            carousel.classList.add('right');
            currentDirection = 'right';
        } else {
            // На десктопе возвращаем исходное направление
            carousel.classList.remove('right');
            carousel.classList.add(pos);
            currentDirection = pos;
        }
        
        // Обновляем размеры после смены направления
        updateSizes();
    }

    // Функция для обновления размеров
    function updateSizes() {
        gap = parseInt(window.getComputedStyle(field).gap);
        
        // В зависимости от текущего направления рассчитываем ширину
        if (currentDirection === 'right') {
            slideWidth = slides[0].offsetWidth + gap;
        } else {
            slideWidth = slides[slides.length - 1].offsetWidth + gap;
        }
        
        field.style.transform = `translateX(${currentPos}px)`;
    }

    // Конфигурация направлений
    const directions = {
        right: { 
            n: 1,
            getIndices: (slides, isNext) => ({
                largeIndex: isNext ? 1 : 0,
                removeIndex: isNext ? 0 : slides.length - 1
            }),
            getOperations: (isNext) => ({
                clone: isNext ? 'append' : 'prepend',
                original: isNext ? 'append' : 'prepend'
            }),
            getTargetSlide: (slides, isNext) => 
                isNext ? slides[0] : slides[slides.length - 1]
        },
        left: {
            n: -1,
            getIndices: (slides, isNext) => ({
                largeIndex: slides.length - 1,
                removeIndex: slides.length - 1
            }),
            getOperations: (isNext) => ({
                clone: isNext ? 'prepend' : 'append',
                original: isNext ? 'prepend' : 'append'
            }),
            getTargetSlide: (slides, isNext) => 
                isNext ? slides[slides.length - 1] : slides[0]
        }
    };

    // Функция для блокировки кнопок
    function toggleButtons(disabled) {
        btnPrev.disabled = disabled;
        btnNext.disabled = disabled;
        
        if (disabled) {
            btnPrev.classList.add('disabled');
            btnNext.classList.add('disabled');
        } else {
            btnPrev.classList.remove('disabled');
            btnNext.classList.remove('disabled');
        }
    }

    // Основная функция анимации
    function animateSlide(direction) {
        if (isAnimating) return;
        
        updateSizes();
        isAnimating = true;
        toggleButtons(true);
        
        const isNext = direction === 'next';
        const config = directions[currentDirection];
        
        const targetSlide = config.getTargetSlide(slides, isNext);
        const operations = config.getOperations(isNext);
        const indices = config.getIndices(slides, isNext);

        const cloneSlide = targetSlide.cloneNode(true);
        field[operations.clone](cloneSlide);
        
        if (isNext) {
            currentPos -= slideWidth * config.n;
            field.style.transform = `translateX(${currentPos}px)`;
            slides[indices.largeIndex].classList.add('large');
            
            setTimeout(() => {
                field.style.transition = 'none';
                field[operations.original](targetSlide);
                field.removeChild(cloneSlide);
                currentPos += slideWidth * config.n;
                field.style.transform = `translateX(${currentPos}px)`;
                slides[indices.removeIndex].classList.remove('large');
                
                setTimeout(() => {
                    field.style.transition = '';
                    isAnimating = false;
                    toggleButtons(false);
                }, 50);
            }, 600);
        } else {
            field.style.transition = 'none';
            currentPos -= slideWidth * config.n;
            field.style.transform = `translateX(${currentPos}px)`;
            
            setTimeout(() => {
                field.style.transition = '';
                currentPos += slideWidth * config.n;
                field.style.transform = `translateX(${currentPos}px)`;
                
                setTimeout(() => {
                    field.style.transition = 'none';
                    field[operations.original](targetSlide);
                    field.removeChild(cloneSlide);
                    
                    setTimeout(() => {
                        field.style.transition = '';
                        isAnimating = false;
                        toggleButtons(false);
                    }, 50);
                }, 600);
            }, 50);
        }
    }

    // Оптимизированный обработчик ресайза
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isAnimating) {
                updateDirection(); // Обновляем направление при ресайзе
            }
        }, 250);
    }

    // Обработчики событий
    btnNext.addEventListener('click', () => animateSlide('next'));
    btnPrev.addEventListener('click', () => animateSlide('prev'));
    window.addEventListener('resize', handleResize);

    // Инициализация
    updateDirection(); // Устанавливаем начальное направление

    return {
        destroy: () => {
            window.removeEventListener('resize', handleResize);
            btnNext.removeEventListener('click', () => animateSlide('next'));
            btnPrev.removeEventListener('click', () => animateSlide('prev'));
        },
        // Дополнительно: метод для принудительного обновления
        updateDirection: updateDirection
    };
}

export default miniCarousel;