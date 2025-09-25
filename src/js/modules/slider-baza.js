const miniCarousel = (selectCarousel) => {
    const carousel = document.querySelector(selectCarousel),
          field = carousel.querySelector('.slider__field'),
          slides = field.children,
          btnPrev = carousel.querySelector('.carousel__btn-prev'),
          btnNext = carousel.querySelector('.carousel__btn-next');

    let gap, slideWidth, currentPos = 0;
    let isAnimating = false;

    // Функция для обновления размеров
    function updateSizes() {
        gap = parseInt(window.getComputedStyle(field).gap);
        slideWidth = slides[0].offsetWidth + gap;
        field.style.transform = `translateX(${currentPos}px)`;
    }

    // Функция для блокировки кнопок во время анимации
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

    // Функция для анимации следующего слайда
    function nextSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        toggleButtons(true);

        // Берем первый слайд для клонирования
        const firstSlide = slides[0];
        const cloneSlide = firstSlide.cloneNode(true);

        // Добавляем клон в конец
        field.append(cloneSlide);
        
        // Сдвигаем влево
        currentPos -= slideWidth;
        field.style.transform = `translateX(${currentPos}px)`;
        
        setTimeout(() => {
            field.style.transition = 'none';
            // Возвращаем оригинальный слайд в конец
            field.append(firstSlide);
            field.removeChild(cloneSlide);
            currentPos += slideWidth;
            field.style.transform = `translateX(${currentPos}px)`;
            
            setTimeout(() => {
                field.style.transition = '';
                isAnimating = false;
                toggleButtons(false);
            }, 50);
        }, 600);
    }

    // Функция для анимации предыдущего слайда
    function prevSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        toggleButtons(true);

        // Берем последний слайд для клонирования
        const lastSlide = slides[slides.length - 1];
        const cloneSlide = lastSlide.cloneNode(true);

        // Добавляем клон в начало
        field.prepend(cloneSlide);
        
        field.style.transition = 'none';
        // Сдвигаем вправо
        currentPos += slideWidth;
        field.style.transform = `translateX(${currentPos}px)`;
        
        setTimeout(() => {
            field.style.transition = '';
            currentPos -= slideWidth;
            field.style.transform = `translateX(${currentPos}px)`;
            
            setTimeout(() => {
                field.style.transition = 'none';
                // Возвращаем оригинальный слайд в начало
                field.prepend(lastSlide);
                field.removeChild(cloneSlide);
                
                setTimeout(() => {
                    field.style.transition = '';
                    isAnimating = false;
                    toggleButtons(false);
                }, 50);
            }, 600);
        }, 50);
    }

    // Обработчики событий
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    // Инициализация
    updateSizes();

    // Обработчик ресайза
    window.addEventListener('resize', updateSizes);

    return {
        destroy: () => {
            window.removeEventListener('resize', updateSizes);
            btnNext.removeEventListener('click', nextSlide);
            btnPrev.removeEventListener('click', prevSlide);
        }
    };
}

export default miniCarousel;