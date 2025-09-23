const miniCarouselLeft = (selectCarousel) => {
    const carousel = document.querySelector(selectCarousel),
          field = carousel.querySelector('.slider__field'),
          slides = field.children,
          btnPrev = carousel.querySelector('.carousel__btn-prev'),
          btnNext = carousel.querySelector('.carousel__btn-next');

    let gap, slideWidth, currentPos = 0;
    let isAnimating = false; // Флаг для отслеживания анимации

    // Функция для обновления размеров
    function updateSizes() {
        gap = parseInt(window.getComputedStyle(field).gap);
        slideWidth = slides[slides.length - 1].offsetWidth + gap;
        
        // Корректируем текущую позицию при изменении размеров
        field.style.transform = `translateX(${currentPos}px)`;
    }

    // Инициализация размеров
    updateSizes();

    // Функция для блокировки/разблокировки кнопок
    function toggleButtons(disabled) {
        btnPrev.disabled = disabled;
        btnNext.disabled = disabled;
        
        // Добавляем/убираем класс для стилизации заблокированных кнопок
        if (disabled) {
            btnPrev.classList.add('disabled');
            btnNext.classList.add('disabled');
        } else {
            btnPrev.classList.remove('disabled');
            btnNext.classList.remove('disabled');
        }
    }

    // Общая функция для анимации слайда
     function animateSlide(direction) {
        if (isAnimating) return;
        
        updateSizes();
        isAnimating = true;
        toggleButtons(true);
        
        const isNext = direction === 'next';
        const targetSlide = isNext ? slides[slides.length - 1] : slides[0]; // ИНВЕРТИРУЕМ!
        const cloneOperation = isNext ? 'prepend' : 'append'; // ИНВЕРТИРУЕМ!
        const originalOperation = isNext ? 'prepend' : 'append'; // ИНВЕРТИРУЕМ!

        // 1. Создаем клон и добавляем в нужное место
        const cloneSlide = targetSlide.cloneNode(true);
        field[cloneOperation](cloneSlide);
        
        if (isNext) {
            // Логика для next (движение ВПРАВО)
            currentPos += slideWidth; // ПЛЮС вместо минуса!
            field.style.transform = `translateX(${currentPos}px)`;
            slides[slides.length - 2].classList.add('large');
            
            setTimeout(() => {
                field.style.transition = 'none';
                field[originalOperation](targetSlide);
                field.removeChild(cloneSlide);
                currentPos -= slideWidth; // МИНУС вместо плюса!
                field.style.transform = `translateX(${currentPos}px)`;
                slides[slides.length - 1].classList.remove('large');
                
                setTimeout(() => {
                    field.style.transition = '';
                    isAnimating = false;
                    toggleButtons(false);
                }, 50);
            }, 600);
        } else {
            // Логика для prev (движение ВЛЕВО)
            field.style.transition = 'none';
            currentPos += slideWidth; // ПЛЮС вместо минуса!
            field.style.transform = `translateX(${currentPos}px)`;
            
            setTimeout(() => {
                field.style.transition = '';
                currentPos -= slideWidth; // МИНУС вместо плюса!
                field.style.transform = `translateX(${currentPos}px)`;
                
                setTimeout(() => {
                    field.style.transition = 'none';
                    field[originalOperation](targetSlide);
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


    // Обработчик изменения размера окна
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isAnimating) {
                updateSizes();
            }
        }, 250); // Задержка для оптимизации
    }

    // Добавляем обработчики событий
    btnNext.addEventListener('click', () => animateSlide('next'));
    btnPrev.addEventListener('click', () => animateSlide('prev'));
    window.addEventListener('resize', handleResize);

    // Функция для очистки (опционально, но рекомендуется)
    return {
        destroy: () => {
            window.removeEventListener('resize', handleResize);
            btnNext.removeEventListener('click', () => animateSlide('next'));
            btnPrev.removeEventListener('click', () => animateSlide('prev'));
        }
    };
}

export default miniCarouselLeft;