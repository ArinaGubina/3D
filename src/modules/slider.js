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

export default slider;
