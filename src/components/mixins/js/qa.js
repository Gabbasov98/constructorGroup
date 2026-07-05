$(".qa-card__show").click(function () {
    $(this).parents(".qa-card").toggleClass("qa-card--active")
    $(this).siblings(".qa-card__hidden").slideToggle()
})

