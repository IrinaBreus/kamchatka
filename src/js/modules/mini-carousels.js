const miniCarousel = (selectCarousel) => {
    const carousel = document.querySelector(selectCarousel),
          field = carousel.querySelector('.slider__field'),
          slides = field.children,
          btnPrev = carousel.querySelector('.carousel__btn-prev'),
          btnNext = carousel.querySelector('.carousel__btn-next');

    let gap = parseInt(window.getComputedStyle(field).gap),
        currentPos = 0,
        slideWidth = slides[0].offsetWidth + gap;

    // Общая функция для анимации слайда
    function animateSlide(direction) {
        const isNext = direction === 'next';
        
        // Определяем слайд и операцию для направления
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
                
                setTimeout(() => field.style.transition = '', 50);
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
                    
                    setTimeout(() => field.style.transition = '', 50);
                }, 600);
            }, 50);
        }
    }

    btnNext.addEventListener('click', () => animateSlide('next'));
    btnPrev.addEventListener('click', () => animateSlide('prev'));
}


export default miniCarousel;