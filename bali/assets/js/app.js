$("body").css("overflow-y", "hidden");

$("#btn-envelope").on("click", function () {
    // $(".envelope-wrap").css("transform", "translateY(-100%)");

    const coverWrap = document.querySelector(".envelope-wrap");
    const coverImage = coverWrap.querySelector("#image-cover");
    const coverTitle = coverWrap.querySelector("#title-cover");
    const coverHeader = coverWrap.querySelector(".header");

    const mainTitle = document.querySelector("#title-main");

    gsap.to(coverTitle, { y: "150%", duration: 0.75 })
    gsap.to(coverImage, { y: "-130%", duration: 1.25, delay: .25 })
    gsap.to(coverHeader, { display: 'none' })
    gsap.to(coverWrap, { display: "none", delay: .4, duration: .5 });

    gsap.fromTo(mainTitle, { y: "130%" }, { y: 0, duration: 1, delay: 1 })
    $("body").css("overflow-y", "auto");
});

var previousScroll = 70;
$(window).scroll(function (e) {
    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= previousScroll) {
        $("nav").addClass("navbar-hide");
    } else if (scroll < previousScroll) {
        $("nav").removeClass("navbar-hide");
        $("nav").addClass("scrolled");
    }

    if (scroll == 0) {
        $("nav").removeClass("navbar-hide");
        $("nav").removeClass("scrolled");
    }
    previousScroll = scroll;
});

const cd = document.querySelector(".countdown").getAttribute("date");

Countdown(cd);

gsap.registerPlugin(ScrollTrigger);

// Parallax

// gsap.utils.toArray('.parallax-wrapper').forEach((imgWrap, i) => {
//     imgWrap.parallax = imgWrap.querySelector(".parallax");

//     gsap.fromTo(imgWrap.parallax, {
//         y: 0,
//     }, {
//         y: "80%",
//         ease: "none",
//         scrollTrigger: {
//             trigger: imgWrap,
//             start: "top top",
//             end: "bottom top",
//             scrub: true,
//             invalidateOnRefresh: true,
//         }
//     })

//     gsap.fromTo(imgWrap.parallax, {
//         y: "-80%",
//     }, {
//         y: 0,
//         ease: "none",
//         scrollTrigger: {
//             trigger: imgWrap,
//             start: "top bottom",
//             end: "bottom bottom",
//             scrub: true,
//             invalidateOnRefresh: true,
//         }
//     })
// })

// Progress Bar
let progress = document.querySelector(".progress");

gsap.to("body", {
    scrollTrigger: {
        onUpdate: (self) => (progress.style.width = `${self.progress * 100}%`),
    },
});

// Egift section
const giftWrap = document.querySelector(".egift-section");
const tabsWrap = giftWrap.querySelector(".tabs-gift");
const tab = tabsWrap.querySelectorAll(".tab");
tab.forEach((el) => {
    el.classList.forEach((c) => {
        c === "active" &&
            giftWrap.querySelector(el.dataset.tab).classList.add("show");
    });

    el.addEventListener("click", (e) => {
        if (tabsWrap.querySelector(".active")) {
            tabsWrap.querySelector(".active").classList.remove("active");
            giftWrap.querySelector(".show").classList.remove("show");
        }

        el.classList.add("active");
        giftWrap.querySelector(el.dataset.tab).classList.add("show");
    });
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

AOS.init({
    easing: "ease-out-back",
    duration: 1000,
});
