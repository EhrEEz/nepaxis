import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger);
export function initHeroTimeline() {
	const heroTimeline = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".hero__section",
				start: "top 100%",
				toggleActions: "play pause resume reset",
				onEnter: () => {
					console.log("entered");
				},
			},
		})
		.addLabel("start");
	SplitText.create(".hero__title .visible-text", {
		type: "lines,words",
		onSplit: (self) => {
			gsap.set(self.words, {
				opacity: 0,
			});
			heroTimeline.to(self.words, {
				duration: 0.8,
				opacity: 1,
				scrambleText: {
					text: "{original}",
					chars: "upperAndLowerCase",
					revealDelay: 0.5,
					speed: 0.8,
				},
			});
		},
	});
	SplitText.create(".hero__subtitle p", {
		type: "lines,words",
		autoSplit: true,
		mask: "lines",
		onSplit: (self) => {
			heroTimeline.from(
				self.lines,
				{
					yPercent: -150,
					transformOrigin: "center left",
					opacity: 0,
					stagger: {
						amount: 0.25,
					},
					duration: 0.6,
					ease: "power1.out",
				},
				"start+=0.3"
			);
		},
	});
	heroTimeline.from(
		".hero__logo",
		{
			opacity: -0.4,
			yPercent: 150,
			duration: 0.6,
			ease: "power2.out",
		},
		"start+=1"
	);
	heroTimeline.from(
		".hero__link",
		{
			opacity: 0,
			yPercent: -100,
			duration: 0.8,
			ease: "power2.out",
		},
		"start+=1"
	);
	heroTimeline.from(
		".hero__times p",
		{
			opacity: 0,
			duration: 0.4,
			ease: "power1.out",
			stagger: {
				each: 0.2,
			},
		},
		"start+=1.25"
	);
	heroTimeline.from(
		".hero__scroll",
		{
			opacity: 0,
			duration: 0.4,
			ease: "power1.out",
		},
		"start+=1.25"
	);

	heroTimeline.scrollTrigger?.disable(true);
}
