window.addEventListener('DOMContentLoaded', () => {
    fix100vh();
    window.addEventListener('resize', () => {
        fix100vh();
        getScrollBarSize()
    })

    getScrollBarSize()

    // $('input[type="tel"]').mask('+7 (999) 999-99-99', { autoclear: false }, { placeholder: '+7 (   )    -  -  ' });
})

function fix100vh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
