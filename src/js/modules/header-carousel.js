const header_carousel = () => {
    const carousel = document.querySelector('.carousel'),
          prevBtn = carousel.querySelector('.carousel__btn-prev'),
          nextBtn = carousel.querySelector('.carousel__btn-next'),
          list = carousel.querySelector('.carousel__list'),
          thumbnail = carousel.querySelector('.carousel__thumbnail');

    let timeRuning = 3000,
        runTimeOut,
        timeAutoNext = 7000;
    let runAutoRun = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    nextBtn.addEventListener('click', () => {
        showSlider('next');
    });
    
    prevBtn.addEventListener('click', () => {
        showSlider('prev');
    });

    function showSlider(type) {
        let itemSlider = document.querySelectorAll('.carousel__item');
        let itemThumbnail = document.querySelectorAll('.carousel__thumbnail-item');

        if(type === 'next') {
            list.appendChild(itemSlider[0]);
            thumbnail.appendChild(itemThumbnail[0]);
            carousel.classList.add('next');
        } else {
            let positionLastItem = itemSlider.length - 1;
            list.prepend(itemSlider[positionLastItem]);
            thumbnail.prepend(itemThumbnail[positionLastItem]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRuning);

        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);
    }
          
}

export default header_carousel;