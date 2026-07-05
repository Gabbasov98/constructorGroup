let body = document.querySelector("body")
let modalTogglers = document.querySelectorAll("[data-modal]")
let modals = document.querySelectorAll(".modal")

modalTogglers.forEach(el => {
    el.onclick = function () {
        let modalId = el.getAttribute("data-modal")
        openModal(modalId)
    }
})

function closeModals() {
    modals.forEach(modal => {
        modal.classList.remove("_active")
        body.classList.remove("fixed-body2")
    })
}

function openModal(modalId) {
    closeModals()
    let modal = document.querySelector(`#${modalId}`)
    let closeButtons = modal.querySelectorAll(`._close-modal`)

    modal.classList.add("_active")
    body.classList.add("fixed-body2")


    closeButtons.forEach(btn => {
        btn.onclick = ()=> {
            modal.classList.remove("_active")
            body.classList.remove("fixed-body2")
        }
    })
}

var getScrollBarSize = (function() {
    var el = window.document.createElement('textarea'), style = {
        'visibility': 'hidden', 'position': 'absolute', 'zIndex': '-2147483647',
        'top': '-1000px', 'left': '-1000px', 'width': '1000px', 'height': '1000px',
        'overflow': 'scroll', 'margin': '0', 'border': '0', 'padding': '0'
    }, support = el.clientWidth !== undefined && el.offsetWidth !== undefined;

    for (var key in style) {
        if (style.hasOwnProperty(key)) {
            el.style[key] = style[key];
        }
    }

    return function() {
        var size = null;
        if (support && window.document.body) {
            window.document.body.appendChild(el);
            size = [el.offsetWidth - el.clientWidth, el.offsetHeight - el.clientHeight];
            window.document.body.removeChild(el);
        }

        document.documentElement.style.setProperty('--scrollWidth', `${size[0]}px`);
        return size;
    };
})();

