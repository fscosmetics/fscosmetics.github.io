var fs = fs || {};
fs.fsMainFunction = function($) {
    //fs.scrollRevealItems();
    fs.stickyNavbar($);
    fs.iconAnimation($);
    fs.typeFormShow();
    $('.toggle-menu').jPushMenu({closeOnClickLink: false});
    $('.dropdown-toggle').dropdown();

    $(".contact-typeform").click(function(e){
        $(".typeform-share").click();
    });
};

fs.typeFormShow = function(){
    (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}id=id+'_';if(!gi.call(d,id)){qs=ce.call(d,'link');qs.rel='stylesheet';qs.id=id;qs.href=b+'share-button.css';s=gt.call(d,'head')[0];s.appendChild(qs,s)}})()
};

fs.scrollRevealItems = function(){
    window.sr = new scrollReveal();
}

fs.iconAnimation = function($) {
    $('#icon-transition').on('click', function () {
        $(this).toggleClass('open');
    });
}

fs.stickyNavbar = function($){
    $(".category-nav-container").sticky({topSpacing:100});
}

$(function(){
    fs.fsMainFunction($);
});
