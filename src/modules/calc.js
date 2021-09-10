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
        if (target.matches('select')) {
            if (calcType.options[calcType.selectedIndex].value === "") {
                calcSquare.value = '';
                calcDay.value = '';
                calcCount.value = '';
            }
            countSum();
        } else if (target.matches('input')) {
            countSum();
        }
    });
};

export default calc;
