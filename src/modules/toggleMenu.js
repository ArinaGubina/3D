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

export default toggleMenu;

