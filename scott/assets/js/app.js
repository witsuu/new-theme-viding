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

        AOS.refresh()
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