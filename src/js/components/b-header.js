let body = document.querySelector("body")
let burger = document.querySelector(".burger");
let header = document.querySelector(".header");

if(burger){
    burger.onclick = function () {
        menuControl()
    }
    burger.onmouseenter = function () {
        menuControl()
    }
}

function menuControl() {
    const isOpen = header.classList.contains("_open");

    if (!isOpen) {
        // Сначала скроллим
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        // Потом фиксируем
        requestAnimationFrame(() => {
            header.classList.add("_open");
            if(window.innerWidth<=992){
                body.classList.add("fixed-body");
            }
        });
    } else {
        body.classList.remove("fixed-body");
        header.classList.remove("_open");
    }
}

const div = document.querySelector( '#popup');

document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(header);

    if ( ! withinBoundaries ) {
        if(header.classList.contains("_open")){
            header.classList.remove("_open")
        }
    }
})
document.addEventListener( 'scroll', (e) => {
    if(header.classList.contains("_open")){
        header.classList.remove("_open")
    }
})
