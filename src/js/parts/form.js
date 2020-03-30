function form() {

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
}

module.exports = form;