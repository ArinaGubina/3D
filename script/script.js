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
        const lessons = 25,
            points = 36;

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

    countTimer('13 september 2021');

    // меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const scrollTo = hr => {
            try {
                const section = document.querySelector(hr.getAttribute('href'));
                if (section) {
                    section.scrollIntoView({ block: "start", behavior: "smooth" });
                }
            } catch { return; }
        };
        const handlerMenu = event => {
            if (event.target.closest('.menu') || event.target.closest('menu')) {
                menu.classList.toggle('active-menu');
            }
            const hr = event.target.closest('a[href]');
            if (hr) {
                event.preventDefault();
                scrollTo(hr);
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
        toggleTabContent(0);
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

    //слайдер
    const slider = () => {
        const portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item');
        const insertDots = () => {
            let insertHtml = `<li class="dot dot-active"></li>`;
            if (slide.length > 0) {
                for (let i = 1; i < slide.length; i++) {
                    insertHtml += `<li class="dot"></li>`;
                }
                portfolioDots.insertAdjacentHTML('afterbegin', insertHtml);
            }
        };
        let currentSlide = 0,
            interval,
            // eslint-disable-next-line prefer-const
            dot;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide = (currentSlide + 1) % slide.length;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(() => autoPlaySlide(), time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide = (currentSlide + 1) % slide.length;
            } else if (target.matches('#arrow-left')) {
                currentSlide = (currentSlide - 1 + slide.length) % slide.length;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }
        });
        insertDots();
        dot = document.querySelectorAll('.dot');
        startSlide(1500);
    };
    slider();

    //наша команда
    const commandMagic = () => {
        const command = document.querySelector('#command');

        const changePhoto = event => {
            if (event.target.matches('.command__photo')) {
                const src = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = src;
            }
        };
        command.addEventListener('mouseover', event => changePhoto(event));
        command.addEventListener('mouseout', event =>  changePhoto(event));
    };
    commandMagic();

    const rules = () => {
        // ошибка в поле
        const errorField = field => {
            console.log(field);
        };
        // ввод цифр
        const regexNum = /[^0-9]/; // регулярка только цифры
        const calcInp = document.querySelectorAll('.calc-block>input');
        calcInp.forEach(item => {
            item.oninput = () => {
                item.value = item.value.replace(regexNum, '');
            };
        });

        // ввод кириллицы
        const regex = /[^А-Яа-яЁё\s-]/g; // регулярка только русские буквы, пробел и дефис
        // регулярка только русские буквы, пробел, дефис знаки препинания
        // eslint-disable-next-line no-useless-escape
        const regexMessage = /[^А-Яа-яЁё\s-\.\!\?\,\:\;"]/g;
        const yourName = document.querySelectorAll('[placeholder="Ваше имя"]'),
            yourMessage = document.querySelector('[placeholder="Ваше сообщение"]');
        yourName.forEach(item => {
            item.oninput = () => {
                item.value = item.value.replace(regex, '');
            };
            item.onchange = () => {
                item.value = item.value.replace(/ +/g, ' ').trim();
                item.value = item.value.replace(/- /g, '-');
                item.value = item.value.replace(/ -/g, '-');
                item.value = item.value.replace(/-+/g, '-');
                const str = item.value;
                let newStr = '';
                for (let i = 0; i < str.length; i++) {
                    if (i === 0 || i === (str.length - 1)) {
                        if (str[i] === '-') {
                            continue;
                        } else if (i === 0) {
                            newStr = str[i].toLocaleUpperCase();
                            continue;
                        }
                    }
                    if (str[i - 1] === ' ' || str[i - 1] === '-') {
                        newStr += str[i].toLocaleUpperCase();
                    } else {
                        newStr += str[i].toLocaleLowerCase();
                    }
                }
                item.value = newStr;
            };
        });
        yourMessage.oninput = () => {
            yourMessage.value = yourMessage.value.replace(regexMessage, '');
        };

        // ввод email
        // регулярка только латинские буквы и спецсимволы + цифры,
        // но у меня нет идей, почему он допускает ввод пробела,
        // а потом удаляет его при вводе нового символа
        // eslint-disable-next-line no-useless-escape
        const regexEm = /[^A-Za-z0-9\@\_\!\~\*\'\-\.]/g;
        const email = document.querySelectorAll('[type="email"]');
        email.forEach(item => {
            item.oninput = () => {
                item.value = item.value.replace(regexEm, '');
            };
            item.onchange = () => {
                item.value = item.value.match(/\S+@\S+\.\w{2,3}/);
            };
        });

        // ввод номера телефона
        // регулярка только цифры, круглые скобки, дефис и +
        // eslint-disable-next-line no-useless-escape
        const regexNumPhone = /[^0-9\(\)-\+]/g;
        const phone = document.querySelectorAll('[type="tel"]');
        phone.forEach(item => {
            item.oninput = () => {
                item.value = item.value.replace(regexNumPhone, '');
            };
        });
    };
    rules();

    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            total = (typeValue && squareValue) ? price * typeValue * squareValue * countValue * dayValue : 0;
            let cur = 0;
            const time = 20;
            const indexInterval = setInterval(() => {
                if (0.95 * total > cur || 1.05 * total < cur) {
                    cur = (total > cur) ? cur + (total - cur) / 3 : cur - (cur - total) / 3;
                    totalValue.textContent = Math.ceil(cur);
                } else {
                    clearInterval(indexInterval);
                    totalValue.textContent = Math.ceil(total);
                }
            }, time);
        };
        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc();

    // отправка формы на сервер
    const sendForm = () => {
        // валидация полей перед отправкой на сервер
        const validate = formInputs => {
            let validation = true;
            formInputs.forEach(input => {
                if (input.value.length < 2 || (input.closest('.form-phone') &&
                !((input.value.length === 12 && input.value[0] === '+') ||
                (input.value.length === 11 && input.value[0] !== '+')))) {
                    input.style.border = '2px solid red';
                    validation = false;
                } else {
                    input.style.border = 'none';
                }
            });
            return validation;
        };
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка...',
            successMessage = 'Отлично! Ответ получен!',
            errorField = 'Поле заполнено неверно';

        const forms = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                console.log(request.status);

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-type', 'aplication/json');
            console.log(body);
            request.send(JSON.stringify(body));
        };

        forms.forEach(item => {
            const formInputs = item.querySelectorAll('input');
            item.addEventListener('submit', event => {
                event.preventDefault();
                item.appendChild(statusMessage);
                console.log(validate(formInputs));
                if (validate(formInputs)) {
                    statusMessage.textContent = loadMessage;
                    const formData = new FormData(item),
                        body = {};
                    formData.forEach((val, key) => {
                        body[key] = val;
                    });
                    postData(body, () => {
                        statusMessage.textContent = successMessage;
                        formInputs.forEach(input => input.value = '');
                    }, error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
                } else {
                    statusMessage.textContent = errorField;
                }
            });
        });
    };
    sendForm();
});
