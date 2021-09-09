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

export default togglePopup;
