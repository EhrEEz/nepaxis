import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./smooth-scroll";
import { initLazyLoadImages } from "./lazy-load";
import { initHeaderAnimations } from "./header-animations";
import { initASCIIAnimations } from "./ascii";
import { initShowMenuImages } from "./hover-image";
import { initDraggable } from "./draggable";
import { initShuffleButtonHover } from "./shuffle";
import { loaded } from "../components/loader";

import { initHeroTimeline } from "./scroll-timelines/hero";
import { initAboutTimeline } from "./scroll-timelines/about";
import { initAsciiTimeline } from "./scroll-timelines/logo";
import { initCapabilitiesTimeline } from "./scroll-timelines/capabilities";
import { initApproachSectionAnimations } from "./scroll-timelines/approach";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
	initSmoothScroll();
	initLazyLoadImages();
	initHeaderAnimations();
	initShuffleButtonHover();

	initShowMenuImages();
	initDraggable();

	document.fonts.ready.then(() => {
		initHeroTimeline();
		initASCIIAnimations();
		initApproachSectionAnimations();
		initAboutTimeline();
		initAsciiTimeline();
		initCapabilitiesTimeline();
	});
	ScrollTrigger.getAll().forEach((trigger) => {
		trigger.disable(true);
	});
}

loaded.then(() => {
	ScrollTrigger.getAll().forEach((trigger) => {
		trigger.enable(false);
		trigger.refresh();
	});
});

//we will defer playing section animations after load.

// todo
// function setFooterOffset() {
//   const footerHeight = document.querySelector("footer")!.offsetHeight;
//   const smoothContent: HTMLElement | null =
//     document.querySelector(".smooth-content") || null;
//   if (!smoothContent) return;
//   smoothContent!.style.setProperty("--footer-offset", `${footerHeight}px`);
// }
