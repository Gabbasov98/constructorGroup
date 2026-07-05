let animatedElements = document.querySelectorAll('.anim-newSing');

let Visible = function(target) {
    // Все позиции элемента
    let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };
    if (targetPosition.bottom - 20 > windowPosition.top &&
        targetPosition.top - 40 < windowPosition.bottom) {
        target.classList.add("in-view")
    }
};

initAnimElements()

window.addEventListener('scroll', function() {
    initAnimElements()
});

function initAnimElements() {
    animatedElements.forEach(el => {
        Visible(el)
    })
}

const odometers = document.querySelectorAll("._number-animation");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const targetValue = parseInt(el.getAttribute("data-end"), 10);
            el.innerHTML = targetValue;
            observer.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

odometers.forEach(el => {
    let format = 'd'

    console.log(el.hasAttribute("data-thousands-separate"))
    if(el.hasAttribute("data-thousands-separate")) {
        // format = '( ddd),dd'
    }
    new Odometer({
        el: el,
        value: 0,
        format,
        theme: 'default'
    });

    observer.observe(el);
});

