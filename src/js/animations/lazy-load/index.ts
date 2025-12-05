import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initLazyLoadImages(): void {
	gsap.utils
		.toArray<HTMLImageElement>(".lazy")
		.forEach((image: HTMLImageElement) => {
			const newSRC: string | null = image.dataset.src || null;
			if (!newSRC) return;

			const newImage: HTMLImageElement = document.createElement("img");

			const loadImage = (): void => {
				newImage.onload = () => {
					newImage.onload = null;
					image.src = newSRC;
					gsap.set(newImage, {
						position: "absolute",
						top: image.offsetTop,
						left: image.offsetLeft,
						width: image.offsetWidth,
						height: image.offsetHeight,
					});
					if (image.parentNode) {
						image.parentNode.appendChild(newImage);
					}

					gsap.to(newImage, {
						opacity: 0,
						onComplete: () => {
							if (newImage.parentNode) {
								newImage.parentNode.removeChild(newImage);
							}
						},
					});

					if (st) {
						st.kill();
					}
				};
				newImage.src = newSRC;
			};

			let st: ScrollTrigger | null = ScrollTrigger.create({
				trigger: image,
				start: "-50% bottom",
				onEnter: loadImage,
				onEnterBack: loadImage,
			});
		});
}
