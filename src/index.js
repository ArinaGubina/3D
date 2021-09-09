import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandMagic from './modules/commandMagic';
import rules from './modules/rules';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('13 september 2021');
// меню
toggleMenu();
//popup
togglePopup();
//tabs
tabs();
//слайдер
slider();
//наша команда
commandMagic();
// правила
rules();
// калькулятор
calc();
// отправка формы на сервер
sendForm();
