import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export function initDraggable() {
	if (window.outerWidth > 545) {
		const windows = gsap.utils.toArray<HTMLElement>(".window");

		windows.forEach((windowItem: HTMLElement) => {
			Draggable.create(windowItem, {
				bounds: ".window-wrapper",
			});
		});
	}
}
