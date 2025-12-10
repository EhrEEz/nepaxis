import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAsciiTimeline() {
	const asciiTimeline = gsap
		.timeline({
			trigger: ".ascii__section",
			start: "top 80%",
			toggleActions: "play none none none",
		})
		.addLabel("start");

	const ascii = document.querySelector(".ascii__card");
	asciiTimeline.to(ascii, {
		scale: 1.15,
		rotationX: -10,
		rotateY: -10,
		transformOrigin: "top center",
		filter: "blur(0.1rem)",
		ease: "power2.out",
		backgroundColor: "var(--clr-neutral-1000)",
		scrollTrigger: {
			trigger: ascii,
			start: "top 0%",
			end: "bottom 5%",
			endTrigger: ".ascii__section",
			scrub: true,
			pin: ".ascii__card",
			pinSpacing: false,
			onEnter: () => {
				const art = document.querySelector(".ascii__art")! as HTMLElement;
				art.style.pointerEvents = "none";
			},
			onEnterBack: () => {
				console.log("now");
				const art = document.querySelector(".ascii__art")! as HTMLElement;
				art.style.pointerEvents = "auto";
			},
		},
	});
	asciiTimeline.scrollTrigger?.disable(true);
}
