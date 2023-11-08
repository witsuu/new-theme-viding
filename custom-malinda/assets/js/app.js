window.scrollTo(0, 0)

const waitCoverLoading = (el) => {
	return new Promise((resolve) => {
		el.classList.add('cover-opening')

		setTimeout(() => resolve(el), 2500)
	})
}

document.body.style.overflow = "hidden"

document.querySelector("#btn-envelope").addEventListener("click", () => {
	document.body.style.overflow = "auto"

	document.querySelector(".cover-section").classList.add("cover-opened")

	runAnimationOrnament()
	runAnimationLoop()
})

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

const cd = document.querySelector(".countdown");

if (cd) Countdown(cd.getAttribute("date"))

gsap.registerPlugin(ScrollTrigger, Flip)

// Progress Bar
let progress = document.querySelector(".progress");

ScrollTrigger.create({
	trigger: "body",
	start: "top top",
	end: "bottom bottom",
	onUpdate: (self) => (progress.style.transform = `${self.progress}`),
})

const getLoadedIframe = (ifr) => {
	return new Promise((resolve, reject) => {
		ifr.onload = () => resolve("maps loaded!")
		ifr.onerror = () => reject("Iframe Load Failed: Please Check Again Your URL!")
		ifr.src = ifr.dataset.src
	})
}

// Modal Event Handler
const mapModal = document.querySelectorAll(".modal");

if (mapModal) {
	mapModal.forEach(modal => {
		modal.addEventListener("shown.bs.modal", (e) => {
			const loader = e.target.querySelector(".loader-wrapper-modal")
			const iframe = e.target.querySelector("iframe")

			getLoadedIframe(iframe).then(() => {
				loader.classList.add("loaded")
			}).catch(err => {
				console.log(err)
			})
		})

		modal.addEventListener("hidden.bs.modal", (e) => {
			const iframe = e.target.querySelector("iframe")
			const loader = e.target.querySelector(".loader-wrapper-modal")
			iframe.src = "";
			loader.classList.remove("loaded");
		})
	})
}

if (document.querySelector(".grid-gallery-default")) {
	$(".grid-gallery-default").magnificPopup({
		delegate: "a",
		type: "image",
		mainClass: "mfp-with-zoom mfp-img-mobile",
		zoom: {
			enabled: true,
			easing: "ease-in-out",
		},
	});
}


if (document.querySelectorAll("[data-anim]")) {
	document.querySelectorAll("[data-anim]").forEach(ada => {
		ada.classList.add("animation-invisible")
	})
}

const runAnimationOrnament = () => {
	document.querySelectorAll("[data-anim]").forEach(da => {
		ScrollTrigger.create({
			trigger: da,
			start: da.dataset.animAnchor ? da.dataset.animAnchor : "top bottom",
			onToggle: self => {
				if (!self.isActive) {
					if (da.classList.contains("animate-loop")) {
						return da.classList.add("animate-paused")
					} else {
						return null;
					}
				}
				if (da.dataset.loadAnimation) {
					if (da.classList.contains("animate-loop")) {
						return da.classList.remove("animate-paused")
					} else {
						return self.kill()
					}
				}

				if (da.dataset.animDuration) da.style.animationDuration = da.dataset.animDuration

				if (da.dataset.animDelay) {
					setTimeout(() => {
						da.classList.add("has-animate")
						da.classList.remove("animation-invisible")
						da.dataset.loadAnimation = true;
					}, da.dataset.animDelay)
				} else {
					da.classList.add("has-animate")
					da.classList.remove("animation-invisible")
					da.dataset.loadAnimation = true;
				}
			}
		})
	})
}

const runAnimationOrnamentCover = () => {
	document.querySelectorAll(".cover-section [data-anim]").forEach(vs => {
		ScrollTrigger.create({
			trigger: vs,
			start: "top bottom",
			onToggle: self => {
				if (self.isActive) {
					if (vs.dataset.animDuration) vs.style.animationDuration = vs.dataset.animDuration

					if (vs.dataset.animDelay) {
						setTimeout(() => {
							vs.classList.add("has-animate")
							vs.classList.remove("animation-invisible")
							vs.dataset.loadAnimation = true;
							self.kill()
						}, vs.dataset.animDelay)
					} else {
						vs.classList.add("has-animate")
						vs.classList.remove("animation-invisible")
						vs.dataset.loadAnimation = true;
						self.kill()
					}
				} else {
					vs.classList.add("animation-invisible")
					self.kill()
				}
			}
		})
	})
}

const runAnimationLoop = () => {
	document.querySelectorAll("[data-animationloop]").forEach(al => {
		ScrollTrigger.create({
			trigger: al,
			start: "-10% bottom",
			onToggle: self => self.isActive ? al.classList.add("animation-loop") : al.classList.remove("animation-loop")
		})
	})
}

const deviceShow = (d) => {
	const style = document.createElement('style')

	style.textContent = `
        .devices-wrapper{
            position:fixed;
            top:0;
            right:0.5rem;
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            color: #16FF00;
            font-family: "Nunito Sans",sans-serif;
            z-index:1300;
        }
        span{
			display:block;
            font-size: 12px;
            font-weight:600;
        }
    `
	document.head.appendChild(style)

	const newEl = document.createElement("div")
	const span1 = document.createElement("span")

	span1.textContent = 'Devices : ' + d

	newEl.classList.add("devices-wrapper")
	newEl.append(span1)

	document.body.appendChild(newEl)
}

const configToAppleDevices = () => {
	const buttons = document.querySelectorAll(".btn-custom")

	buttons.forEach(btn => {
		btn.classList.add("apple-adjust")
	})
}


function checkOS(n) {
	if (n.userAgentData) {
		const hints = ["architecture", "model", "platform", "platformVersion", "uaFullVersion"];
		n.userAgentData.getHighEntropyValues(hints)
			.then(ua => {
				if (ua.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
					deviceShow(ua.platform)
					configToAppleDevices()
				}
				else {
					deviceShow(ua.platform)
				}
			});
	} else {
		if (n.userAgent.match(/(Mac|iPhone|iPod|iPad)/i)) {
			console.log("is Apple devices")
			deviceShow(n.userAgent)
			configToAppleDevices()
		} else {
			deviceShow(n.userAgent)
		}
		console.warn("navigator.userAgentData is not supported!")
	}
}

checkOS(navigator)