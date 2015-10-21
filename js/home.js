var fs = fs || {};
fs.init = function() {
    fs.navbarScroll();
    fs.pageScroll();
    fs.initMenuOnHover();
    fs.initWhatsNewContentHover();
    fs.initMenuOnHover();
    fs.initProductImgSlider();
};

fs.initProductImgSlider = function(){
    $('#productImgSlider').owlCarousel({
        lazyLoad:true,
        loop:true,
        autoplay:90000,
        mouseDrag:false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
};


fs.navbarScroll = function(){
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
            $('nav').addClass('navbar-shrink');
        } else {
            $('nav').removeClass('navbar-shrink');
        }
    });
};

fs.pageScroll = function(){
    $('.page-scroll a').on('click', function(e){
        e.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 80
        }, 1500, 'easeInOutExpo');
    });
};


fs.initWhatsNewContentHover = function(){
    $('.content-container').on('mouseenter', function(){
        $(this).find('.content-description').css('opacity','1');
    });
    $('.content-container').on('mouseleave', function(){
        $(this).find('.content-description').css('opacity','0');
    });
};

fs.initMenuOnHover = function(){
    $('#navbar-menu-container li').on('mouseenter', function(){
        $(this).css({opacity:1});
    });
    $('#navbar-menu-container li').on('mouseleave', function(){
        $(this).css({opacity:1});
    });
};


$(function(){
    fs.init();
});
