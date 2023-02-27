window.scrollTo(0, 0);

const getPercentage = (num = 0, max = 0) => {
	return (num / max) * 100;
};

const mW = window.matchMedia("(min-width: 992px)");

const setSizeLayout = (mww) => {
	if (mww.matches) {
		const widthRatio = 10;
		const heightRatio = 16;

		const widthScreen = screen.width;
		const heightScreen = screen.height;

		const aspectRatio = widthRatio / heightRatio;

		const widthResult = parseFloat((heightScreen * aspectRatio).toFixed(2));

		const widthLayout = getPercentage(widthResult, widthScreen).toFixed(2);
		const widthBg = 100 - widthLayout;

		const layoutView = document.querySelector(".layout__views");
		const bgView = document.querySelector(".background__views .background__frames");

		layoutView.style.width = `${widthLayout}%`;
		layoutView.style.marginLeft = "auto";

		bgView.style.width = `${widthBg}%`;

		// Image Transition
		let isActive = "main";
		const bgSection = document.querySelector(".background__views .background__frames");

		const main = document.querySelector(".header-section");
		let imgURL = main.querySelector(".image-wrapper img").src ? main.querySelector(".image-wrapper img").src : main.querySelector(".image-wrapper img").dataset.src;

		gsap.to(bgSection.querySelector(".background__image"), {
			position: "absolute",
			inset: 0,
			height: "100vh",
			backgroundImage: `url(${imgURL})`,
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			opacity: 1,
			onComplete: () => (isActive = "main"),
		});

		gsap.utils.toArray(".trigger-background").forEach((tb) => {
			ScrollTrigger.create({
				trigger: tb,
				start: "top center",
				onToggle: (self) => {
					if (isActive != self.trigger.dataset.active) {
						gsap.to(bgSection.querySelector(".background__image:nth-child(2)"), 1, {
							opacity: 0,
							onComplete: () => bgSection.querySelector(".background__image:nth-child(2)").remove(),
						});

						imgURL = self.trigger.querySelector(".image-wrapper img").src ? self.trigger.querySelector(".image-wrapper img").src : self.trigger.querySelector(".image-wrapper img").dataset.src;
						let newDiv = document.createElement("div");
						newDiv.classList.add("background__image");
						bgSection.appendChild(newDiv);

						gsap.fromTo(
							newDiv,
							{
								opacity: 0,
								position: "absolute",
								inset: 0,
								height: "100vh",
								backgroundImage: `url(${imgURL})`,
								backgroundPosition: "center center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							},
							{
								opacity: 1,
								duration: 1,
								onComplete: () => (isActive = self.trigger.dataset.active),
							}
						);
					}

					self.refresh();
				},
			});
		});

		AOS.refresh();
	} else {
		const layoutView = document.querySelector(".layout__views");
		layoutView.style.width = `100%`;
	}
};

setSizeLayout(mW);

mW.addEventListener("change", setSizeLayout);

$("body").css("overflow-y", "hidden");

$("#btn-envelope").on("click", function () {
	$("body").css("overflow-y", "auto");

	$(".envelope-wrap").css("transform", "translateY(-100%)");
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

// Parallax
gsap.registerPlugin(ScrollTrigger);

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
if (giftWrap) {
	const tabsWrap = giftWrap.querySelector(".tabs-gift");
	const tab = tabsWrap.querySelectorAll(".tab");
	tab.forEach((el) => {
		el.classList.forEach((c) => {
			if (c === "active") {
				giftWrap.querySelectorAll(el.dataset.tab).forEach((tb) => {
					tb.classList.add("show");
				});

				AOS.refresh();
			}
		});

		el.addEventListener("click", (e) => {
			if (tabsWrap.querySelector(".active")) {
				tabsWrap.querySelector(".active").classList.remove("active");
				giftWrap.querySelectorAll(".show").forEach((se) => {
					se.classList.remove("show");
				});
			}

			el.classList.add("active");
			giftWrap.querySelectorAll(el.dataset.tab).forEach((tb) => {
				tb.classList.add("show");
			});

			AOS.refresh();
		});
	});
}

if (document.querySelector(".zoom-gallery")) {
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
}

AOS.init({
	easing: "ease-out-back",
	duration: 2000,
});

const gallery = document.querySelector(".gallery");
if (gallery) {
	const gridLg = [2, 3, 8, 9, 14];
	const gridSm = [2, 3, 8, 9, 14];

	const mq = window.matchMedia("(max-width: 767px)");

	const galleryItems = gallery.querySelectorAll("a");

	const switchGrid = (mqh) => {
		let grid = gallery.querySelectorAll(".grid-lg");
		if (grid) {
			grid.forEach((el, index) => {
				el.classList.remove("grid-lg");
			});
		}

		galleryItems.forEach((el, index) => {
			const heightImg = galleryItems[0].querySelector("img").clientHeight;
			if (mqh.matches) {
				if (gridSm.includes(index)) {
					el.classList.add("grid-lg");
					el.querySelector("img").style.height = `${heightImg}px`;
				}
			} else {
				if (gridLg.includes(index)) {
					el.classList.add("grid-lg");
					el.querySelector("img").style.height = `${heightImg}px`;
				}
			}
		});

		AOS.refresh();
	};

	switchGrid(mq);

	mq.addEventListener("change", switchGrid);
}

if (mW.matches) {
	AOS.refresh();
}

AOS.refresh();
