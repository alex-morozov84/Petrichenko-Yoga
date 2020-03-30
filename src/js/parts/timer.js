function timer() {
    
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
}

module.exports = timer;