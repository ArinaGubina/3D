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
    const errorMessage = 'Что-то пошло не так:(',
        loadMessage = 'Загрузка...',
        successMessage = 'Отлично! Ответ получен!!!',
        errorField = 'Поле заполнено неверно';

    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    // отправка на сервер
    const postData = body => fetch('./server.php', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'aplication/json',
        },
        redirect: 'follow',
        referrer: 'client',
        body: JSON.stringify(body)
    });

    forms.forEach(item => {
        const formInputs = item.querySelectorAll('input');
        item.addEventListener('submit', event => {
            event.preventDefault();
            item.appendChild(statusMessage);
            if (validate(formInputs)) {
                if (item.id === 'form3') {
                    statusMessage.style.color = 'white';
                }
                statusMessage.textContent = loadMessage;
                const formData = new FormData(item),
                    body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        setTimeout(() => {
                            statusMessage.remove();
                            const popup = document.querySelector('.popup');
                            popup.style.display = 'none';
                        }, 2500);
                        formInputs.forEach(input => input.value = '');
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            } else {
                statusMessage.textContent = errorField;
            }
        });
    });
};

export default sendForm;
