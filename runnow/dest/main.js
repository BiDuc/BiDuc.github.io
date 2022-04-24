function ShowItems($target, $itemID){
	$('#nft-items-menu').children().removeClass('active');
	$($target).addClass('active');

	$('#nft-items-container').find('.slider').removeClass('active-slider');
	$('#' + $itemID).addClass('active-slider');
	$('#' + $itemID).css('opacity', '1');

	$('#nft-items-container').find('.flickity-enabled').hide();
	$('#' + $itemID).show();
	$('#' + $itemID).insertAfter($('#nft-items-menu').parent());
}

function InitNFTItems(){
	$('#nft-items-menu').find('.active').click();
	//$('#nft-items-container').find('.flickity-enabled').hide();
}

function ShowAllNFTItems(){
	$('#nft-items-container').find('.slider').show();
	$('#nft-items-container').find('.slider').css("opacity", "0");
	$('#nft-items-container').find('.active-slider').css("opacity", "1");

	setTimeout(InitNFTItems, 500);
}

function HideCardSliderByWindowSize(){
	if ($(window).width() <= 991) {
		$('.card-container').hide();
	}
	else{
		$('.card-container-mb').hide();
	}
}

function ShowAllCardSliders(){
	$('.card-container').show();
	$('.card-container-mb').show();

	setTimeout(HideCardSliderByWindowSize, 500);
}
///////////////////////// SCROLL ///////////////////////////////
$(document).ready(function () {
	let header = $(".header"),
		btnMenu = $(".header__btnmenu"),
		screen = {
			mobile: 767,
			tablet: 1024,
			desktop: 1199,
		};

	function debounce(func, timeout = 300) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	const svg = document.querySelectorAll(".svg");
	SVGInjector(svg);

	let locomotive;
	locomotive = new LocomotiveScroll({
		el: document.querySelector("[data-scroll-container]"),
		smooth: true,
		lerp: 0.15,
		getSpeed: true,
		getDirection: true,
		reloadOnContextChange: true,
		resetNativeScroll: true,
		tablet: { smooth: false },
		smartphone: { smooth: false },
	});

	//DisableScroll
	function disableSCroll(unit = true) {
		const body = $("body");
		if (unit) body.addClass("no-scroll");
		else body.removeClass("no-scroll");
	}

	// DETECT DEVICE
	function mobileDetect() {
		let md = new MobileDetect(window.navigator.userAgent);
		if (md.mobile() != null || md.tablet() != null) {
			mobile = true;
			tablet = true;
		} else {
			mobile = false;
			tablet = false;
		}
	}
	mobileDetect();

	///////////////////////// WINDOW RESIZE ////////////////////////

	function setStorageDevice() {
		let windowsize = $(window).width();
		if (windowsize <= screen.mobile) {
			localStorage.setItem("device", "mobile");
		} else if (windowsize <= screen.tablet) {
			localStorage.setItem("device", "tablet");
		} else {
			localStorage.setItem("device", "desktop");
		}
	}
	setStorageDevice();

	function reloadOnResize() {
		ShowAllNFTItems();
		ShowAllCardSliders();
		let windowsize = $(window).width(),
			divice = localStorage.getItem("device");
		if (windowsize <= screen.mobile && divice != "mobile") {
			location.reload();
			setStorageDevice();
		} else if (
			windowsize <= screen.tablet &&
			windowsize > screen.mobile &&
			divice != "tablet"
		) {
			location.reload();
			setStorageDevice();
		} else if (windowsize > screen.tablet && divice != "desktop") {
			location.reload();
			setStorageDevice();
		}
	}

	$(window).resize(function () {
		setTimeout(function () {
			reloadOnResize();
		}, 100);
	});

	//CLONE MENU TO MOBILE
	function initMobileNavigator() {
		const headerMenu = $("header .header .menu");
		const headerBrand = $("header .header .header-top .header-brands").clone();
		const headerCTA = $("header .header .header-top .header-cta").clone();
		const menuClonde = headerMenu.clone();

		const navTop = document.createElement("div");
		$(navTop).addClass("nav-top");

		headerBrand.addClass("nav-top-brands");
		headerCTA.addClass("nav-top-cta");

		$(navTop).append(headerBrand, headerCTA);

		$("nav .inner").append(menuClonde);
		$(navTop).insertBefore(menuClonde);

		// Collapse Sub Menu

		$("nav .menu .sub-menu").slideUp();

		$(window).on("resize", function () {
			if ($(window).width() < 992) return;
			$("[data=hamburger-menu]").removeClass("active");
			$("nav").removeClass("--show");
			disableSCroll($("nav").hasClass("--show"));
		});
	}

	//NAVIGATOR MOBILE CLICK EVENT

	function mobileNavigatorClick() {
		const TARGET = "nav .menu .menu-item[expanded] .menu-link";
		$(document).on("click", TARGET, function () {
			const parentElement = $(this).parent();
			const subMenu = $(this).next();
			$("nav .menu .menu-item[expanded]").attr("expanded", "");
			if (subMenu.css("display") !== "none") {
				subMenu.slideUp();
				parentElement.attr("expanded", "");
			} else {
				$(TARGET).next().slideUp();
				subMenu.slideDown();
				parentElement.attr("expanded", true);
			}
		});
	}

	// TOGGLE TRANSPARENT BACKGROUND HEADER
	function headerMouseEnter() {
		$(".menu .menu-item[expanded]").on("mouseenter", function () {
			$("header").addClass("--mouse-enter");
		});
		$(".menu .menu-item[expanded]").on("mouseleave", function () {
			$("header").removeClass("--mouse-enter");
		});
	}

	// TOGGLE CURSOR WHEN ENTER AND LEAVE MOUSSE ON SECTION
	function toggleCursorVisibility() {
		$(".use-custom-cursor").on("mouseenter", function () {
			cursor.addClass("--show");
		});
		$(".use-custom-cursor").on("mouseleave", function () {
			cursor.removeClass("--show");
		});
	}

	// HERO BANNER BUTTON CLICK
	function videoHeroBannerClick() {
		const buttonPlay = $(".hero-section .button-play-wrap");
		const targetVideo = $(".hero-section video");
		const poster = $(".hero-section .poster-video");
		buttonPlay.on("click", function () {
			if (buttonPlay.hasClass("--playing")) {
				targetVideo.get(0).pause();
				buttonPlay.removeClass("--playing");
				buttonPlay.addClass("--pausing");
			} else {
				poster.addClass("--hide"); //hide poster
				buttonPlay.addClass("--playing");
				buttonPlay.removeClass("--pausing");
				targetVideo.get(0).play();
			}
		});
		targetVideo.on("click", function () {
			if (buttonPlay.hasClass("--playing")) {
				targetVideo.get(0).pause();
				buttonPlay.removeClass("--playing");
				buttonPlay.addClass("--pausing");
			} else {
				poster.addClass("--hide"); //hide poster
				buttonPlay.addClass("--playing");
				buttonPlay.removeClass("--pausing");
				targetVideo.get(0).play();
			}
		});
		targetVideo.on("pause", function () {
			buttonPlay.addClass("--pausing");
			buttonPlay.removeClass("--playing");
		});
		targetVideo.on("ended", function () {
			this.src = this.src;
			buttonPlay.removeClass("--pausing --playing");
			poster.removeClass("--hide");
		});
	}

	/* MENU ITEM CLICK */
	function menuHeader() {
		$(document).on("click", `.menu .menu-link`, function (e) {
			const target = $(this).attr("href");
			if (!target || !target?.startsWith("#")) return;
			e.preventDefault();
			$("[data=hamburger-menu]").removeClass("active");
			$("[data=hamburger-menu]").velocity("reverse");

			$("[data=hamburger-menu]")
				.find("b:nth-child(3)")
				.velocity({ rotateZ: "0deg" }, { duration: 600, easing: [250, 10] })
				.velocity({ top: "100%" }, { duration: 100, easing: "swing" });
			$("[data=hamburger-menu]")
				.find("b:nth-child(1)")
				.velocity("reverse", { delay: 200 });
			$("nav").removeClass("--show");
			locomotive.scrollTo(target, {
				offset: -100,
			});
			disableSCroll(false);
		});
	}

	// HAMBURGER HEADER CLICK
	function hamburgerClick(remove = true) {
		const McButton = $("[data=hamburger-menu]");
		const McBar1 = McButton.find("b:nth-child(1)");
		const McBar2 = McButton.find("b:nth-child(2)");
		const McBar3 = McButton.find("b:nth-child(3)");

		McButton.click(function () {
			McButton.toggleClass("active");
			$("nav").toggleClass("--show");

			disableSCroll($("nav").hasClass("--show"));
			console.log(1);
			if (McButton.hasClass("active")) {
				McBar1.velocity({ top: "50%" }, { duration: 200, easing: "swing" });
				McBar3.velocity(
					{ top: "50%" },
					{ duration: 200, easing: "swing" }
				).velocity(
					{ rotateZ: "90deg" },
					{ duration: 600, delay: 100, easing: [250, 20] }
				);
				McButton.velocity(
					{ rotateZ: "135deg" },
					{ duration: 600, delay: 100, easing: [250, 20] }
				);
			} else {
				McButton.velocity("reverse");

				McBar3.velocity(
					{ rotateZ: "0deg" },
					{ duration: 600, easing: [250, 20] }
				).velocity({ top: "100%" }, { duration: 200, easing: "swing" });
				McBar1.velocity("reverse", { delay: 100 });
			}
		});
	}

	// DOG SLIDER
	function initCyberSpaceSlider() {
		const $carousel = $(".about-section .about-slider .slider").flickity({
			cellAlign: "center",
			contain: true,
			freeScroll: false,
			wrapAround: true,
			dragThreshold: 0,
			pageDots: false,
			prevNextButtons: false,
			lazyLoad: 3,
			on: {
			    ready: function() {			    	
			      	InitNFTItems();
		    	},
			    change: function( index ) {
			    }
			}
		});

		$carousel.on("dragStart.flickity", function () {
			gsap.to(cursor, { scale: 0.8, duration: 0.2 });
		});
		$carousel.on("dragEnd.flickity", function () {
			gsap.to(cursor, { scale: 1, duration: 0.2 });
		});
		$carousel.on("dragMove.flickity", function (event, pointer, moveVector) {
			const { pageX, pageY } = pointer;

			cursorPosition = { ...{ x: pageX, y: pageY } };
			gsap.to({}, 0.0, {
				onUpdate: function () {
					gsap.set(cursor, {
						x: cursorPosition.x,
						y: cursorPosition.y,
					});
				},
			});
		});
	}

	// ROAD MAP SLIDER
	function roadmapSlider() {
		const $carousel = $(".roadmap.inner .slider").flickity({
			cellAlign: "center",
			contain: true,
			watchCSS: true,
			freeScroll: false,
			pageDots: false,
			groupCells: 2,
			prevNextButtons: true,
		  	arrowShape: {
			  	x0: 10,
			  	x1: 60, y1: 50,
			  	x2: 60, y2: 45,
			  	x3: 15
		  	}
		});
		$(".roadmap").on("mouseenter", function () {
			cursor.addClass("--show");
		});
		$(".roadmap").on("mouseleave", function () {
			cursor.removeClass("--show");
		});

		$carousel.on("dragStart.flickity", function () {
			gsap.to(cursor, { scale: 0.8, duration: 0.2 });
		});
		$carousel.on("dragEnd.flickity", function () {
			gsap.to(cursor, { scale: 1, duration: 0.2 });
		});
		$carousel.on("dragMove.flickity", function (event, pointer, moveVector) {
			const { pageX, pageY } = pointer;

			cursorPosition = { ...{ x: pageX, y: pageY } };
			gsap.to({}, 0.0, {
				onUpdate: function () {
					gsap.set(cursor, {
						x: cursorPosition.x,
						y: cursorPosition.y,
					});
				},
			});
		});
	}

	function CardSlider() {
		const $carousel = $(".card-container.inner .slider").flickity({
			cellAlign: "center",
			contain: true,
			wrapAround: true,
			freeScroll: false,
			pageDots: false,
			groupCells: 1,
			prevNextButtons: false,
			on: {
			    ready: function() {			    	
					if ($(window).width() <= 991) {
						$('.card-container').hide();
					}
				}
		    }
		});
		$(".card-container").on("mouseenter", function () {
			cursor.addClass("--show");
		});
		$(".card-container").on("mouseleave", function () {
			cursor.removeClass("--show");
		});

		$carousel.on("dragStart.flickity", function () {
			gsap.to(cursor, { scale: 0.8, duration: 0.2 });
		});
		$carousel.on("dragEnd.flickity", function () {
			gsap.to(cursor, { scale: 1, duration: 0.2 });
		});
		$carousel.on("dragMove.flickity", function (event, pointer, moveVector) {
			const { pageX, pageY } = pointer;

			cursorPosition = { ...{ x: pageX, y: pageY } };
			gsap.to({}, 0.0, {
				onUpdate: function () {
					gsap.set(cursor, {
						x: cursorPosition.x,
						y: cursorPosition.y,
					});
				},
			});
		});
	}
	
	function CardSliderMB() {
		const $carousel = $(".card-container-mb.inner .slider").flickity({
			cellAlign: "center",
			contain: true,
			wrapAround: true,
			freeScroll: false,
			pageDots: false,
			groupCells: 1,
			prevNextButtons: false,
			on: {
			    ready: function() {			    	
					if ($(window).width() > 991) {
						$('.card-container-mb').hide();
					}
				}
		    }
		});
		$(".card-container-mb").on("mouseenter", function () {
			cursor.addClass("--show");
		});
		$(".card-container-mb").on("mouseleave", function () {
			cursor.removeClass("--show");
		});

		$carousel.on("dragStart.flickity", function () {
			gsap.to(cursor, { scale: 0.8, duration: 0.2 });
		});
		$carousel.on("dragEnd.flickity", function () {
			gsap.to(cursor, { scale: 1, duration: 0.2 });
		});
		$carousel.on("dragMove.flickity", function (event, pointer, moveVector) {
			const { pageX, pageY } = pointer;

			cursorPosition = { ...{ x: pageX, y: pageY } };
			gsap.to({}, 0.0, {
				onUpdate: function () {
					gsap.set(cursor, {
						x: cursorPosition.x,
						y: cursorPosition.y,
					});
				},
			});
		});
	}
	//MEMBER SLIDER (ON SMALL DEVICE)
	function memberSlideHandle() {
		let teamSlider = null;
		const device = localStorage.getItem("device");
		if (device === "mobile" || device === "tablet") {
			teamSlider = $(".team-section .slider").flickity({
				cellAlign: "left",
				contain: "true",
				freeScroll: true,
				pageDots: false,
				prevNextButtons: false,
			});
		} else {
			teamSlider?.flickity("destroy");
		}

		// initSlider();
		// $(window).on("resize", function () {
		// 	initSlider();
		// });
	}

	//CUSTOM CURSOR
	let cursor = $(".cursor"),
		windowPosition = {
			x: $(window).width() / 2,
			y: $(window).height() / 2,
		},
		cursorPosition = {
			x: windowPosition.x,
			y: windowPosition.y,
		},
		speed = 0.18,
		xSet = gsap.quickSetter(cursor, "x", "px"),
		ySet = gsap.quickSetter(cursor, "y", "px");

	gsap.set(cursor, {
		xPercent: -50,
		yPercent: -50,
	});

	function customizeCursor() {
		gsap.ticker.add(() => {
			let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
			windowPosition.x += (cursorPosition.x - windowPosition.x) * dt;
			windowPosition.y += (cursorPosition.y - windowPosition.y) * dt;
			xSet(windowPosition.x);
			ySet(windowPosition.y);
		});
		if (!mobile || !tablet) {
			gsap.to(cursor, { alpha: 1, duration: 0.3 });
		} else {
			gsap.to(cursor, { alpha: 0, duration: 0.3 });
		}

		toggleCursorVisibility();
	}

	window.addEventListener("mousemove", (e) => {
		cursorPosition.x = e.x;
		cursorPosition.y = e.y;
	});

	function cyberLabVideoHandle() {
		const labContent = $(".lab-section .head-wrapper .head-item");
		const videoItems = $(".lab-section .slide-wrapper .slide-item video");

		labContent.eq(0)?.addClass("selected");
		videoItems.eq(0)?.addClass("selected");

		labContent.on("click", function () {
			labContent.removeClass("selected");
			videoItems.removeClass("selected");

			labContent.eq($(this).index()).addClass("selected");
			videoItems.eq($(this).index()).addClass("selected");

			videoItems.stop();
			videoItems.eq($(this).index()).get(0).play();
		});
	}

	// INIT
	function init() {
		$("html")
			.imagesLoaded()
			.progress({ background: true }, function (instance, image) { })
			.always(function (instance) {
				initMobileNavigator();
				headerMouseEnter();
				customizeCursor();
				videoHeroBannerClick();
				initCyberSpaceSlider();
				hamburgerClick();
				cyberLabVideoHandle();
				CardSlider();
				CardSliderMB();
				roadmapSlider();
				memberSlideHandle();
				mobileNavigatorClick();
				menuHeader();
				locomotive.update();
				$(".loading").addClass("--hide");
			})
			.fail(function () {
				// console.log('all images loaded, at least one is broken');
			})
			.done(function (instance) {
				console.log("all images successfully loaded");
				// initCyberSpaceSlider();
			});
	}
	init();
});