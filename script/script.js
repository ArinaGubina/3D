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
        const lessons = 20,
            points = 28;

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
        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const scrollTo = event => {
            event.preventDefault();
            const hr = event.target.closest('a[href]');
            if (hr) {
                const section = document.querySelector(hr.getAttribute('href'));
                if (section) {
                    section.scrollIntoView({ block: "start", behavior: "smooth" });
                }
            }
        };
        const handlerMenu = event => {
            if (event.target.closest('.menu') || event.target.closest('menu')) {
                menu.classList.toggle('active-menu');
            }
            if (!event.target.closest('.menu')) {
                scrollTo(event);
            }
        };
        body.addEventListener('click', event => {
            if (event.target.closest('a[href]') || event.target.closest('.menu')) {
                handlerMenu(event);
            } else if (menu.classList.contains('active-menu') && !event.target.closest('menu')) {
                menu.classList.remove('active-menu');
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopup();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
});
