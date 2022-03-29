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

$(".zoom-gallery").magnificPopup({
    delegate: "a",
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

const cloudLeft1 = $('.cloud-left-1')
const cloudLeft2 = $(".cloud-left-2")
const cloudRight1 = $('.cloud-right-1')
const cloudRight2 = $('.cloud-right-2')

const cloudLeft3 = $('.cloud-left-3')
const cloudRight4 = $('.cloud-right-4')

gsap.to([cloudLeft1, cloudLeft3], {
    x: 20,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone,
    duration: 5
})

gsap.to([cloudLeft2], {
    x: 15,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone,
    duration: 5
})

gsap.to([cloudRight1], {
    x: -20,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone,
    duration: 5
})
gsap.to([cloudRight2, cloudRight4], {
    x: -15,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone,
    duration: 5
})