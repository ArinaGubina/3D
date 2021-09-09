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
    const lessons = 29,
        points = 39;

    setTimeout(() => {
        const timerDiploma = getTimeRemaining(deadLine),
            h = timerDiploma.hours + 11,
            m = timerDiploma.minutes,
            t = (h * 60 + m) / (57 - points),
            timer30 = getTimeRemaining('10 september 2021'),
            h30 = timer30.hours,
            m30 = timer30.minutes,
            t30 = (h30 * 60 + m30) / (30 - lessons);
        console.log('Время на урок: ' + Math.floor(t30 / 60) + ':' + Math.floor(t30 % 60));
        console.log('Время на балл: ' + Math.floor(t / 60) + ':' + Math.floor(t % 60));
    }, 3000);
}

export default countTimer;
