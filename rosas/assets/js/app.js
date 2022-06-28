$("body").css('overflow-y', 'hidden')

$("#btn-envelope").on("click", function () {
    $("body").css("overflow-y", "auto");

    $(".envelope-wrap").css("transform", "translateY(-100%)");
});

var previousScroll = 70;
$(window).scroll(function (e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= previousScroll) {
        $('nav').addClass("navbar-hide");
    } else if (scroll < previousScroll) {
        $('nav').removeClass("navbar-hide");
        $('nav').addClass("scrolled");
    }

    if (scroll == 0) {
        $('nav').removeClass("navbar-hide");
        $('nav').removeClass("scrolled");
    }
    previousScroll = scroll;
});

const cd = document.querySelector('.countdown').getAttribute('date')

Countdown(cd)

// Parallax
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.parallax-wrapper').forEach((imgWrap, i) => {
    imgWrap.parallax = imgWrap.querySelector(".parallax");

    gsap.fromTo(imgWrap.parallax, {
        y: 0,
    }, {
        y: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: imgWrap,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
        }
    })

    gsap.fromTo(imgWrap.parallax, {
        y: "-100%",
    }, {
        y: 0,
        ease: "none",
        scrollTrigger: {
            trigger: imgWrap,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
        }
    })
})

// Progress Bar
let progress = document.querySelector(".progress");

gsap.to("body", {
    scrollTrigger: {
        onUpdate: self => progress.style.width = `${self.progress *100}%`
    }
})

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