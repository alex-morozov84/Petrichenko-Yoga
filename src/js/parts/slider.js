function slider() {

    let slideIndex = 1, /* - слайд, который отображается по-умолчанию */
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n) {

        // Если слайды закончились, возвращаемся к первому
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); /* - скрываем ВСЕ слайды */
        
        // // то же самое, записанное циклом:
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }

        // Убираем класс активности со всех точек:
        dots.forEach((item) => item.classList.remove('dot-active'));

        // Активируем слайд и точку. Единица отнимается, для того, чтобы перевести "нормальную" нумерацию в JS(с нуля)
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    }

    // function plusSlides(n) {
    //     showSlides(slideIndex +=n);
    // }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Можно так навесить на кнопки:
    // prev.addEventListener('click', function() {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function() {
    //     plusSlides(1);
    // });

    // А можно так:
    prev.addEventListener('click', () => showSlides(slideIndex +=-1));
    next.addEventListener('click', () => showSlides(slideIndex +=1));

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

}

module.exports = slider;