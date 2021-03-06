window.scrollTo(0, 0)

// $("body").css('overflow-y', 'hidden')

// $("#btn-envelope").on("click", function () {
//     $("body").css("overflow-y", "auto");

//     $(".envelope-wrap").css("transform", "translateY(-100%)");
// });

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

// Egift section
const giftWrap = document.querySelector(".egift-section");
const tabsWrap = giftWrap.querySelector(".tabs-gift");
const tab = tabsWrap.querySelectorAll(".tab");
tab.forEach(el => {
    el.classList.forEach(c => {
        c === "active" && giftWrap.querySelector(el.dataset.tab).classList.add('show');
    })

    el.addEventListener('click', e => {
        if (tabsWrap.querySelector(".active")) {
            tabsWrap.querySelector(".active").classList.remove("active");
            giftWrap.querySelector(".show").classList.remove('show')
        }

        el.classList.add('active')
        giftWrap.querySelector(el.dataset.tab).classList.add('show');
    })
})

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

// Progress Bar
let progress = document.querySelector(".progress");

gsap.to("body", {
    scrollTrigger: {
        onUpdate: self => progress.style.width = `${self.progress *100}%`
    }
})

// gsap.utils.toArray(".venue-content").forEach((vc, i) => {
//     vc.event = vc.querySelector("#event");
//     vc.maps = vc.querySelector("#maps");
//     vc.buttonMaps = vc.querySelector("#button-maps");
//     vc.btnClose = vc.querySelector(".btn-close");

//     vc.maps.style.opacity = 0;

//     vc.buttonMaps.addEventListener("click", e => {
//         gsap.fromTo(vc.maps, .5, {
//             x: "100%",
//         }, {
//             x: "0%",
//             opacity: 1,
//             ease: "none",
//             display: "block",
//             position: "relative"
//         })

//         gsap.fromTo(vc.event, .5, {
//             x: "0%",
//         }, {
//             x: "-100%",
//             display: "none",
//             opacity: 0,
//             ease: "none",
//             position: "absolute"
//         })
//     })

//     vc.btnClose.addEventListener("click", e => {
//         gsap.fromTo(vc.event, .5, {
//             x: "-100%",
//         }, {
//             x: "0%",
//             ease: "none",
//             opacity: 1,
//             display: "block",
//             position: "relative"
//         })

//         gsap.fromTo(vc.maps, .5, {
//             x: "0%",
//             opacity: 1,
//             position: "absolute"
//         }, {
//             x: "100%",
//             opacity: 0,
//             display: "none",
//             ease: "none",
//         })
//     })
// })