window.addEventListener('DOMContentLoaded', () => {
    //Timer
    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            return { timeRemaining, hours, minutes, seconds };
        }

        const intervalIndex = setInterval(() => {
            updateClock();
        }, 1000);

        function updateClock() {
            const timer = getTimeRemaining();
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
    }

    countTimer('13 september 2021');
});
