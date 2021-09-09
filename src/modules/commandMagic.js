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

export default commandMagic;
