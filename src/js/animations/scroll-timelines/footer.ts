import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import type _ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, SplitText);

export function initFooterTimeline() {
	const footer = document.querySelector(".footer__section") as HTMLElement;
	const contact__section = document.querySelector(
		".contact__section"
	) as HTMLElement;

	if (!contact__section || !footer) return;
	const footerHeight = footer.offsetHeight;
	const slideOutDuration = contact__section.offsetHeight * 1.25;
	const totalDuration = footerHeight + slideOutDuration;

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: contact__section,
			start: "bottom bottom",
			end: `+=${totalDuration}`,
			scrub: true,
			pin: contact__section,
			pinSpacing: false,
			id: "contact-pin-slide",
		},
	});

	tl.to(
		contact__section,
		{
			duration: footerHeight,
			y: 0,
			ease: "none",
		},
		0
	);

	tl.to(
		contact__section,
		{
			duration: slideOutDuration,
			y: -contact__section.offsetHeight,
			ease: "none",
		},
		footerHeight
	);
}
