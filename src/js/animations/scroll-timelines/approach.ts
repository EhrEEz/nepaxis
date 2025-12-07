import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function initApproachSectionAnimations() {
	const textSplit = SplitText.create(".approach__text", {
		type: "lines",
		autoSplit: true,
		linesClass: "line",
		onSplit: (splitText) => {
			const lines = splitText.lines;
			return gsap.to(lines, {
				stagger: 1,
				duration: 1.5,
				ease: "none",
				backgroundSize: "100%",
				scrollTrigger: {
					trigger: lines,
					start: "center 80%",
					end: "center 20%",
					scrub: true,
				},
			});
		},
	});
	gsap.to(textSplit.lines, {});
	const approachSectionTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: ".approach__section",
			start: "top 90%",
			end: "bottom 30%",
			toggleActions: "play none none none",
			scrub: true,
		},
	});
	approachSectionTimeline.addLabel("start").from(".approach__item", {
		yPercent: 50,
		ease: "back.inOut",
		duration: 1,
		stagger: 0.1,
	});
	approachSectionTimeline
		.from(
			".approach__image",
			{
				opacity: 0,
				scale: 0.9,
				rotate: "random(-20, 20, 2)",
				ease: "back.out",
				duration: 0.5,
				stagger: 0.1,
			},
			"start+=1"
		)
		.addLabel("finish_image");
}
