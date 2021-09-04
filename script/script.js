window.addEventListener('DOMContentLoaded', () => {
    //Timer
    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(deadLineArg) {
            const dateStop = new Date(deadLineArg).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            return { timeRemaining, hours, minutes, seconds };
        }

        updateClock();
        const intervalIndex = setInterval(() => {
            updateClock();
        }, 1000);

        function updateClock() {
            const timer = getTimeRemaining(deadLine);
            timerHours.textContent = (timer.hours / 10 < 1) ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = (timer.minutes / 10 < 1) ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = (timer.seconds / 10 < 1) ? '0' + timer.seconds : timer.seconds;

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(intervalIndex);
            }
        }

        // Что-то я слегка отстала. Надо подсчитать, сколько времени осталось на выполнение оставшихся уроков :)
        const lessons = 17,
            points = 26;

        setTimeout(() => {
            const timerDiploma = getTimeRemaining(deadLine),
                h = timerDiploma.hours + 11,
                m = timerDiploma.minutes,
                t = (h * 60 + m) / (57 - points),
                timer30 = getTimeRemaining('9 september 2021'),
                h30 = timer30.hours,
                m30 = timer30.minutes,
                t30 = (h30 * 60 + m30) / (30 - lessons);
            console.log('Время на 1 урок: ' + Math.floor(t30 / 60) + ':' + Math.floor(t30 % 60));
            console.log('Время на 1 балл: ' + Math.floor(t / 60) + ':' + Math.floor(t % 60));
        }, 3000);
    }

    countTimer('13 september 2021');

    // меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        let popupInterval,
            left;
        const popupAnimate = () => {
            popupInterval = requestAnimationFrame(popupAnimate);
            if (left > 39) {
                left -= 5 - 0.073 * (105 - left);
                popupContent.style.left = left + '%';
            } else {
                cancelAnimationFrame(popupInterval);
            }
        };
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (window.screen.width >= 768) {
                    left = 105;
                    popupContent.style.left = left + '%';
                    popupInterval = requestAnimationFrame(popupAnimate);
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopup();
});
