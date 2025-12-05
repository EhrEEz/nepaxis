import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeaderAnimations(): void {
	let sectionTheme: string = "dark";
	const mainNav: HTMLElement | null =
		document.querySelector<HTMLElement>("#headerNav");
	if (!mainNav) return;
	const sections: NodeListOf<HTMLElement> =
		document.querySelectorAll<HTMLElement>("[data-section]");

	sections.forEach((section: HTMLElement) => {
		ScrollTrigger.create({
			trigger: section,
			start: "top 2%",
			end: "bottom 2%",
			onEnter: () => {
				const theme = section.getAttribute("data-section");
				if (theme) {
					sectionTheme = theme;
				}
			},
			onToggle: (self: ScrollTrigger) => {
				if (self.isActive) {
					const theme = section.getAttribute("data-section");
					if (theme) {
						sectionTheme = theme;
					}
					switch (sectionTheme) {
						case "light":
							mainNav.setAttribute("data-logo-active", "dark");
							break;
						case "dark":
							mainNav.setAttribute("data-logo-active", "light");
							break;
						case "invert":
							mainNav.setAttribute("data-logo-active", "invert");
							break;
						default:
							break;
					}
				}
			},
		});
	});
}
