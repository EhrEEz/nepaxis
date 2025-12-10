import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);

export function initAboutTimeline() {
	const aboutTimeline = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".about__section",
				start: "top 80%",
				toggleActions: "play pause resume none",
			},
		})
		.addLabel("start");

	SplitText.create(".about__paragraph p", {
		type: "lines",
		autoSplit: true,
		mask: "lines",
		onSplit: (self) => {
			const words = self.lines;
			aboutTimeline.from(
				words,
				{
					opacity: 0,
					duration: 0.5,
					yPercent: -100,
					stagger: {
						amount: 0.4,
					},
					ease: "power1.out",
				},
				"start"
			);
		},
	});
	aboutTimeline.fromTo(
		".about__title",
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1,
			scrambleText: {
				text: "{original}",
				chars: "upperCase",
				revealDelay: 0.75,
				speed: 0.6,
			},
		},
		"start+=0.5"
	);
	aboutTimeline.scrollTrigger?.disable(true);
}
