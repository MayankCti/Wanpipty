jQuery(document).ready(function() {
    jQuery('.ct_loader_main').fadeOut();
});
AOS.init();


$(document).ready(function(){
    $('.ct_chat_icon').click(function(){
        $(".ct_chat_box_main").toggleClass('ct_chat_active')
    })
})