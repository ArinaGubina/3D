const rules = () => {
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

export default rules;
