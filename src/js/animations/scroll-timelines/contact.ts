import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, SplitText);

export function initContactTimeline() {
	SplitText.create(".contact__title", {
		type: "words,lines",
		autoSplit: true,
		onSplit: (self) => {
			gsap.set(self.words, {
				opacity: 0,
			});
			gsap.to(self.words, {
				duration: 1,
				opacity: 1,
				ease: "none",
				scrambleText: {
					speed: 0.7,
					revealDelay: 0.35,
					text: "{original}",
					chars: "upperCase",
				},
				scrollTrigger: {
					trigger: ".contact__title",
					start: "top 70%",
					end: "bottom 0%",
					toggleActions: "play none none none",
				},
			});
		},
	});

	const fg = gsap.utils.toArray(
		".contact__section .form__group,.big__button-wrapper"
	) as HTMLElement[];

	fg.forEach((emt, index) => {
		gsap.from(emt, {
			opacity: 0,
			yPercent: 50,
			duration: 1,
			ease: "power1.out",
			stagger: 0.1,
			delay: index * 0.1,
			scrollTrigger: {
				trigger: emt,
				start: "top 90%",
				end: "bottom 0%",
				toggleActions: "play none none none",
			},
		});
	});

	const contactInfoTimeline = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".contact__info",
				endTrigger: ".contact__section",
				toggleActions: "play none none none",
			},
		})
		.addLabel("start");
	gsap.set(".info__title", {
		opacity: 0,
	});
	contactInfoTimeline.to(
		".info__title",
		{
			opacity: 1,
			stagger: 0.2,
			ease: "power1.out",
			duration: 0.8,
			scrambleText: {
				speed: 0.7,
				revealDelay: 0.35,
				text: "{original}",
				chars: "upperCase",
			},
		},
		"start"
	);

	contactInfoTimeline.from(
		".info__body > *",
		{
			opacity: 0,
			yPercent: 50,
			ease: "power1.out",
			duration: 0.8,
			stagger: 0.05,
		},
		"start+=0.7"
	);
	contactInfoTimeline.scrollTrigger?.disable(true);
}
