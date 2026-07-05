function Sliders() {
    let SlidersArray = []

    let sliders = document.querySelectorAll(".slider")
    sliders.forEach((slider,index) => {
        slider.setAttribute("data-slider-id",index)

        let isLoop = slider.classList.contains("_loop")

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

let mainSlider = document.querySelector(".main-slider")
if(mainSlider) {
    const swiper = new Swiper('.main-slider .swiper-container', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
            init(sw) {
                initSlideMedia(sw);
                handleActiveSlide(sw);
            },
            slideChangeTransitionEnd(sw) {
                handleActiveSlide(sw);
            },
        },
    });

    function initSlideMedia(sw) {
        sw.slides.forEach((slide) => {
            const media = slide.querySelector('.slide-media');
            const loader = slide.querySelector('.slide-loader');
            if (!media) return;

            const markLoaded = () => {
                media.classList.add('is-loaded');
                loader?.classList.add('is-hidden');
                slide.dataset.loaded = 'true';

                if (slide.classList.contains('swiper-slide-active')) {
                    activateSlide(sw, slide);
                }
            };

            const markError = () => {
                loader?.classList.add('is-hidden');
                slide.dataset.loaded = 'true';
                slide.dataset.error = 'true';

                if (slide.classList.contains('swiper-slide-active')) {
                    activateSlide(sw, slide);
                }
            };

            if (media.tagName === 'IMG') {
                if (media.complete && media.naturalWidth > 0) {
                    markLoaded();
                } else {
                    media.addEventListener('load', markLoaded, { once: true });
                    media.addEventListener('error', markError, { once: true });
                }
            }

            if (media.tagName === 'VIDEO') {
                if (media.readyState >= 2) {
                    markLoaded();
                } else {
                    media.addEventListener('loadeddata', markLoaded, { once: true });
                    media.addEventListener('error', markError, { once: true });
                }
            }
        });
    }

    function handleActiveSlide(sw) {
        sw.autoplay.stop();

        sw.slides.forEach((slide) => {
            const video = slide.querySelector('video.slide-media');
            if (!video) return;

            if (!slide.classList.contains('swiper-slide-active')) {
                video.pause();
                if (video._endedHandler) {
                    video.removeEventListener('ended', video._endedHandler);
                    video._endedHandler = null;
                }
            }
        });

        const activeSlide = sw.slides[sw.activeIndex];
        if (activeSlide.dataset.loaded === 'true') {
            activateSlide(sw, activeSlide);
        }
        // иначе activateSlide вызовется из markLoaded/markError, когда media будет готова
    }

    function activateSlide(sw, slide) {
        // защита от гонки: пока ждали загрузку, слайд мог перестать быть активным
        if (!slide.classList.contains('swiper-slide-active')) return;

        const video = slide.querySelector('video.slide-media');

        if (video) {
            if (slide.dataset.error === 'true') {
                // видео битое — не виснем навсегда, листаем дальше через паузу
                setTimeout(() => {
                    if (slide.classList.contains('swiper-slide-active')) sw.slideNext();
                }, 1500);
                return;
            }

            video.currentTime = 0;
            video.play().catch(() => {});

            const onEnded = () => {
                video.removeEventListener('ended', onEnded);
                video._endedHandler = null;
                sw.slideNext();
            };
            video._endedHandler = onEnded;
            video.addEventListener('ended', onEnded);
        } else {
            // обычный слайд с картинкой — включаем стандартный автоплей свайпера
            sw.autoplay.start();
        }
    }
}