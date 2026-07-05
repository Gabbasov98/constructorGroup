$(".tab").click(function () {
    let path = $(this).attr("data-tabs-path")
    $(".tab").removeClass("tab--active")
    $(this).addClass("tab--active")
    $(".tab__content").removeClass("tab__content--active")
    $(`.tab__content[data-tabs-path="${path}"]`).addClass("tab__content--active")
})
