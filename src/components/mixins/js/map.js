// <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=9133eb49-3a97-4b2d-90be-6b80a97a5036"></script>

let maps = document.querySelectorAll("[data-cord1]")

ymaps.ready(init);




function init(map){
    maps.forEach(map=> {
        createMap(map)
    })

    function createMap(map){
        let cord = [+map.dataset.cord1, +map.dataset.cord2]

        let myMap = new ymaps.Map(map, {
            center: cord,
            zoom: 17,
            controls: []
        });
        myMap.behaviors.disable('scrollZoom');

        let placeMark = new ymaps.Placemark(cord, {},
            {
                iconLayout: 'default#image',
                iconImageHref: "img/mark2.svg",
                iconImageSize: [30, 30],
            }
        );
        myMap.geoObjects.add(placeMark);
    }
}
