const cd = document.querySelector('.countdown').getAttribute('date')

Countdown(cd)

$("body").css('overflow-y', 'hidden')

$("#btn-envelope").on("click", function () {
    $("body").css("overflow-y", "auto");

    $(".envelope-wrap").css("transform", "translateY(-100%)");
});

$(document).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > $('nav').height())
});

$("#zoom-gallery").magnificPopup({
    delegate: "li a",
    type: "image",
    mainClass: "mfp-with-zoom mfp-img-mobile",
    gallery: {
        enabled: true,
    },
    zoom: {
        enabled: true,
        easing: "ease-in-out",
    },
});