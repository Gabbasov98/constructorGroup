// $("._tab").click(function() {
//     let parentBlock = $(this).parents("._tabs-parent")
//     let tabId = $(this).attr("data-tab")
//     $(parentBlock).find("._tab").removeClass("_active")
//     $(this).addClass("_active")
//     $(parentBlock).find(".tab-content").removeClass("_active")
//     $(parentBlock).find(`.${tabId}`).addClass("_active")
// })
//
// $(".qa-card__show").click(function() {
//     $(this).parents(".qa-card").toggleClass("_active")
//     $(this).siblings(".qa-card__hidden").slideToggle()
// })

// $(document).mouseup( function(e){
//     let div = $( ".header-action__item--cart" );
//     if ( !div.is(e.target)
//         && div.has(e.target).length === 0 ) {
//         if($(div).hasClass("_open")){
//             $(div).removeClass("_open")
//         }
//     }
// });