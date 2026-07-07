let body = document.querySelector("body")
let burger = document.querySelector(".burger");
let header = document.querySelector(".header");

if(burger){
    burger.onclick = function (){
        const isOpen = header.classList.contains("_open");

        if (!isOpen) {
            // Сначала скроллим
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            // Потом фиксируем
            requestAnimationFrame(() => {
                body.classList.add("fixed-body");
                header.classList.add("_open");
            });
        } else {
            body.classList.remove("fixed-body");
            header.classList.remove("_open");
        }
    }
}