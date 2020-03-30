window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    
    // Tabs

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadLine = '2020-03-27';

    // difference between current date and "deadLine":
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = ((t / 1000) % 60), 
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t/1000/60/60);
            // for days:
            // hours = Math.floor((t / 1000 / 60 / 60) % 24),
            // days = Math.floor(1000/60/60/60/24);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // Setting (positioning) timer in the page and starting it:
    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function checkZero(num) {
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

        function updateClock() {
            let t = getTimeRemaining(endTime);
    
            if (t.total < 0 ) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            } else {
                    hours.textContent = checkZero(t.hours);
                    minutes.textContent = checkZero(t.minutes);
                    seconds.textContent = checkZero(t.seconds);
                }   

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadLine);

    // Modal Window

    let more = document.querySelector('.more'),
        moreBtn = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    function modal(btn) {
        btn.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    
        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            btn.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    }
    
    modal(more);

    moreBtn.forEach(function(item) {
        modal(item);
    });


    // Send Form

    // let message = {
    //     loading: "Загрузка",
    //     success: "Спасибо. Скоро мы с вами свяжемся.",
    //     failure: "Что-то пошло не так!"
    // };

    // let modalForm = document.querySelector('.main-form'),
    //     contactForm = document.getElementById('form'),
    //     // inputModal = modalForm.getElementsByTagName('input'),  - для случая без объединения запросов в одну функцию
    //     // inputContact = contactForm.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');
    //     statusMessage.classList.add('status');

    // function sendRequest(event) {
    //     event.preventDefault();
    //     this.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formData = new FormData(this);
    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });
    //     let json = JSON.stringify(obj); 

    //     request.send(json);

    //     let input = this.getElementsByTagName('input');

    //     request.addEventListener('readystatechange', function() {  
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });
    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // }

    // modalForm.addEventListener('submit', sendRequest);
    // contactForm.addEventListener('submit', sendRequest);

    // Без объединения запросов в одну функцию
    // 1)

    // modalForm.addEventListener('submit', function(event) {  /* событие "навешивается" обязательно на форму, а не на кнопку!!! */
    //     // при нажатии на Submit в форме по-умолчанию ВСЕГДА произойдет перезагузка страницы. Чтобы этого избежать отменяем стандарное поведение браузера
    //     event.preventDefault();
    //     modalForm.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  /* - для отправки обычной формы */
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');  /* - для отправки в формате JSON */
        
    //     // Чтобы отправлять данные из формы на сервер, в html в input ОБЯЗАТЕЛЬНО должен присутствовать параметр name!!!

    //     let formData = new FormData(modalForm);

    //     // FormData "просто так" не преобразовать в JSON
    //     // Необходимо создать промежуточный объект
    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });
    //     let json = JSON.stringify(obj); /* - теперь его преобразуем в JSON */
    //     //


    //     // request.send(formData);  /* - отправка в обычном формате */
    //     request.send(json); /* - отправка в json */

    //     request.addEventListener('readystatechange', function() {  /*readystatechange - для наблюдением за состоянием запроса */
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });
    //     for (let i = 0; i < inputModal.length; i++) {
    //         inputModal[i].value = '';
    //     }
    // });

    // // 2)

    // contactForm.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     contactForm.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //     let formData = new FormData(contactForm);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });
    //     let json = JSON.stringify(obj);

    //     request.send(json);

    //     request.addEventListener('readystatechange', function() {  /*readystatechange - для наблюдением за состоянием запроса */
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });
    //     for (let i = 0; i < inputContact.length; i++) {
    //         inputContact[i].value = '';
    //     }
    // });


    // С использованием Promise:

    let message = {
        loading: "Загрузка",
        success: "Спасибо. Скоро мы с вами свяжемся.",
        failure: "Что-то пошло не так!"
    };

    let modalForm = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        // inputModal = modalForm.getElementsByTagName('input'),  - для случая без объединения запросов в одну функцию
        // inputContact = contactForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

    function sendRequest(event) {
        event.preventDefault();
        this.appendChild(statusMessage);

        let formData = new FormData(this);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let data = JSON.stringify(obj); 

        function postData(data) {  /* - функция, использующая Promise */

            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                
                request.onreadystatechange = function() { /* - то же, что request.addEventListener('readystatechange', function() */
                    console.log(request.readyState);
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                request.send(data);
            });
        }

        let input = this.getElementsByTagName('input');

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(data)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);  
    }

    modalForm.addEventListener('submit', sendRequest);
    contactForm.addEventListener('submit', sendRequest);


    // Slider

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


    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value; /* - получаем значение value из html */
        }
    });
});