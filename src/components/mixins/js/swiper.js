function Slider() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 2,
            },
        }
    })
}

let SlidersArray = []

function Sliders() {
    $(".slider").each(function(index, el) {
        $(el).attr("data-slider-id", `${index}`)
        SlidersArray[index] = new Swiper(`.slider[data-slider-id="${index}"] .swiper-container`, {
            slidesPerView: "auto",
            spaceBetween: 10,
            navigation: {
                nextEl: `.slider[data-slider-id="${index}"] .swiper-button-next`,
                prevEl: `.slider[data-slider-id="${index}"] .swiper-button-prev`,
            },
            pagination: {
                el: `.slider[data-slider-id="${index}"] .swiper-pagination`,
                type: 'bullets',
                clickable: true,
            },
        })
    })
}
