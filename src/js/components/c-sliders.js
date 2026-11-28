function Sliders() {
    let SlidersArray = []

    let sliders = document.querySelectorAll(".slider")
    sliders.forEach((slider,index) => {
        slider.setAttribute("data-slider-id",index)

        let isLoop = slider.classList.contains("_loop")
        let autoplay = slider.classList.contains("_autoplay")
        let fade = slider.classList.contains("_fade")
        let autoplayOptions = false
        let effect = false
        let fadeEffect = false
        let speed = 300


        if(autoplay){
            autoplayOptions = {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }
        }
        if(fade){
            effect = 'fade'
            fadeEffect = {
                crossFade: true
            }
            speed = 2500
        }

        SlidersArray[index] = new Swiper(`.slider[data-slider-id="${index}"] .swiper-container`, {
            slidesPerView: "auto",
            spaceBetween: 0,
            watchSlidesProgress: true,
            preventClicks :true,
            a11y: false,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            loop: isLoop,
            autoplay: autoplayOptions,
            effect: effect,
            fadeEffect: fadeEffect,
            speed: speed,
            navigation: {
                nextEl: `.slider[data-slider-id="${index}"] .swiper-button-next`,
                prevEl: `.slider[data-slider-id="${index}"] .swiper-button-prev`,
            },
            pagination: {
                el: `.slider[data-slider-id="${index}"] .swiper-pagination`,
                type: 'bullets',
                clickable: true,
            },
            on: {
                init: function () {
                    if(slider.classList.contains("projects-slider")){
                        this.slideTo(1,0)
                    }
                }
            }
        })

        if(slider.classList.contains("history-slider")){
            let prev = document.querySelector(".history-slider__btn--prev")
            let next = document.querySelector(".history-slider__btn--next")

            prev.onmouseover = function () {
                SlidersArray[index].slidePrev()
            }
            next.onmouseover = function () {
                SlidersArray[index].slideNext()
            }
        }
    })
}

function gallery() {
    let SlidersArray = []

    let sliders = document.querySelectorAll(".gallery")
    sliders.forEach((slider,index) => {
        slider.setAttribute("data-slider-id",index)
        let gallery = {
            mySwiper: {},
            mySwiper2: {}
        }

        gallery.mySwiper = new Swiper(`.gallery[data-slider-id="${index}"] .mySwiper`, {
            spaceBetween: 0,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
            direction: "vertical",
            breakpoints: {
                320: {
                    direction: "horizontal",
                },
                992: {
                    direction: "vertical",
                }
            }
        });
        gallery.mySwiper2 = new Swiper(`.gallery[data-slider-id="${index}"] .mySwiper2`, {
            spaceBetween: 0,
            direction: "vertical",
            loop: true,
            navigation: {
                nextEl: `.gallery[data-slider-id="${index}"] .swiper-button-next`,
                prevEl: `.gallery[data-slider-id="${index}"] .swiper-button-prev`,
            },
            thumbs: {
                swiper:  gallery.mySwiper,
            },
            breakpoints: {
                320: {
                    direction: "horizontal",
                },
                992: {
                    direction: "vertical",
                }
            }
        });

        SlidersArray[index] = gallery
    })

}


Sliders()
gallery()

let mainSlider = document.querySelector('.main-slider');
if (mainSlider) {
    const DELAY = 4000;
    const single = mainSlider.querySelectorAll('.swiper-slide').length < 2;

    // Слайдов 2+ — показываем стрелки и цифры
    mainSlider.classList.toggle('_multi', !single);

    // Убираем лоадер и плавно показываем картинку/видео слайда
    function showSlide(slide) {
        slide.querySelector('.slide-media')?.classList.add('is-loaded');
        slide.querySelector('.slide-loader')?.classList.add('is-hidden');
    }

    // Картинки — по загрузке
    mainSlider.querySelectorAll('img.slide-media').forEach(img => {
        const slide = img.closest('.swiper-slide');
        if (img.complete && img.naturalWidth > 0) showSlide(slide);
        else {
            img.addEventListener('load', () => showSlide(slide), { once: true });
            img.addEventListener('error', () => showSlide(slide), { once: true });
        }
    });

    // Видео — когда реально пошли кадры (а не просто загрузилось начало)
    mainSlider.querySelectorAll('video.slide-media').forEach(video => {
        const slide = video.closest('.swiper-slide');
        video.addEventListener('playing', () => showSlide(slide));
        video.addEventListener('timeupdate', () => {
            if (video.currentTime > 0) showSlide(slide);
        });
        video.addEventListener('error', () => showSlide(slide));
    });

    // Таймер для слайда-картинки (если слайд один — листать некуда)
    function runTimer(sw) {
        if (!single) sw.autoplay.start();
    }

    function handleSlide(sw) {
        const slide = sw.slides[sw.activeIndex];
        const video = slide?.querySelector('video.slide-media');

        // Остальные видео на паузу
        sw.slides.forEach(sl => {
            const v = sl.querySelector('video.slide-media');
            if (v && v !== video) v.pause();
        });

        if (!video) {
            runTimer(sw);
            return;
        }

        // Видео-слайд: таймер выключаем.
        // Слайд один — видео крутится бесконечно, иначе по окончании листаем дальше
        sw.autoplay.stop();
        video.loop = single;
        video.onended = single ? null : () => sw.slideNext();

        const p = video.play();
        if (p && p.catch) p.catch(() => {
            // Слайд уже сменили, пока видео запускалось — ничего не делаем
            if (sw.slides[sw.activeIndex] !== slide) return;
            // Автозапуск запрещён или видео битое:
            // показываем первый кадр и листаем по обычному таймеру
            if (video.readyState >= 2) showSlide(slide);
            else video.addEventListener('loadeddata', () => showSlide(slide), { once: true });
            runTimer(sw);
        });
    }

    // Когда слайд уже скрыт — перематываем его видео в начало
    function resetHidden(sw) {
        sw.slides.forEach((sl, i) => {
            if (i === sw.activeIndex) return;
            const v = sl.querySelector('video.slide-media');
            if (!v) return;
            v.pause();
            if (v.currentTime > 0) v.currentTime = 0;
        });
    }

    new Swiper('.main-slider .swiper-container', {
        rewind: !single,          // вместо loop: true — не клонирует слайд с видео
        allowTouchMove: !single,  // слайд один — свайп отключён
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        autoplay: single ? false : {
            delay: DELAY,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.main-slider .slider-arrow-next',
            prevEl: '.main-slider .slider-arrow-prev',
        },
        pagination: {
            el: '.main-slider .slider-fraction',
            type: 'custom',
            renderCustom: (sw, current, total) => {
                return `<span class="slider-fraction-curr">${String(current).padStart(2, '0')}</span><span class="slider-fraction-sep">/</span><span class="slider-fraction-tot">${String(total).padStart(2, '0')}</span>`;
            },
        },
        on: {
            init: handleSlide,
            slideChange: handleSlide,
            slideChangeTransitionEnd: resetHidden,
        },
    });
}
