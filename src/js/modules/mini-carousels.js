const miniCarousel = (selectCarousel) => {
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
        slideWidth = slides[0].offsetWidth + gap;
        
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
        // Если уже идет анимация - выходим
        if (isAnimating) return;
        
        // Обновляем размеры перед анимацией (на всякий случай)
        updateSizes();
        
        // Блокируем кнопки
        isAnimating = true;
        toggleButtons(true);
        
        const isNext = direction === 'next';
        const targetSlide = isNext ? slides[0] : slides[slides.length - 1];
        const cloneOperation = isNext ? 'append' : 'prepend';
        const originalOperation = isNext ? 'append' : 'prepend';

        // 1. Создаем клон и добавляем в нужное место
        const cloneSlide = targetSlide.cloneNode(true);
        field[cloneOperation](cloneSlide);
        
        if (isNext) {
            // Логика для next
            currentPos -= slideWidth;
            field.style.transform = `translateX(${currentPos}px)`;
            slides[1].classList.add('large');
            
            setTimeout(() => {
                field.style.transition = 'none';
                field[originalOperation](targetSlide);
                field.removeChild(cloneSlide);
                currentPos += slideWidth;
                field.style.transform = `translateX(${currentPos}px)`;
                slides[0].classList.remove('large');
                
                setTimeout(() => {
                    field.style.transition = '';
                    // Разблокируем кнопки после всей анимации
                    isAnimating = false;
                    toggleButtons(false);
                }, 50);
            }, 600);
        } else {
            // Логика для prev
            field.style.transition = 'none';
            currentPos -= slideWidth;
            field.style.transform = `translateX(${currentPos}px)`;
            
            setTimeout(() => {
                field.style.transition = '';
                currentPos += slideWidth;
                field.style.transform = `translateX(${currentPos}px)`;
                
                setTimeout(() => {
                    field.style.transition = 'none';
                    field[originalOperation](targetSlide);
                    field.removeChild(cloneSlide);
                    
                    setTimeout(() => {
                        field.style.transition = '';
                        // Разблокируем кнопки после всей анимации
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

export default miniCarousel;