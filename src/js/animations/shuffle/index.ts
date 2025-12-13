const duration = 35;
const max_frames = 7;
const intervalMap = new Map<HTMLElement, ReturnType<typeof setInterval>>();
const config = { max_frames: max_frames, duration };

function shuffleArr<T>(arr: T[]) {
	type Accumulator = [T[], T[]];
	return arr.reduce(
		([a, b]: Accumulator): Accumulator => (
			b.push(...a.splice((Math.random() * a.length) | 0, 1)), [a, b]
		),
		[[...arr], []] as Accumulator
	)[1];
}
type shuffleConfig = {
	max_frames?: number;
	duration?: number;
};
export function shuffleText(
	shuffledEl: HTMLElement | Element,
	config: shuffleConfig
): ReturnType<typeof setInterval> {
	const { max_frames = 7, duration = 50 } = config;
	let textOrig = shuffledEl.textContent || "";
	let charArr = textOrig.split("");
	let frame = 0;

	const inter = setInterval(() => {
		if (frame < max_frames) {
			let charArrShuff = shuffleArr(charArr);
			shuffledEl.textContent = charArrShuff.join("");
			frame++;
		} else {
			clearInterval(inter);
			shuffledEl.textContent = textOrig;
		}
	}, duration);

	return inter;
}

export function handleSingleShuffle(shuffledEl: HTMLElement) {
	const parentButton: HTMLButtonElement | null =
		shuffledEl.closest(`[class*="btn-"]`) || null;
	if (!parentButton) return;

	const textOrig = shuffledEl.textContent || "";

	// **1. Layout Shift Prevention (One-time setup)**
	const originalWidth = shuffledEl.offsetWidth;
	shuffledEl.style.width = `${originalWidth}px`;
	shuffledEl.style.display = "inline-block";

	// **2. Mouseover Listener (Start Animation)**
	parentButton.addEventListener("mouseenter", () => {
		if (intervalMap.has(shuffledEl)) {
			clearInterval(intervalMap.get(shuffledEl));
		}
		const newInter = shuffleText(shuffledEl, config);
		intervalMap.set(shuffledEl, newInter);
	});

	// **3. Mouseleave Listener (Stop Animation)**
	parentButton.addEventListener("mouseleave", () => {
		const inter = intervalMap.get(shuffledEl);

		if (inter !== undefined) {
			clearInterval(inter);
			intervalMap.delete(shuffledEl);
		}
		shuffledEl.textContent = textOrig;
	});
}
export function initShuffleButtonHover() {
	const shuffledEls: NodeListOf<HTMLElement> =
		document.querySelectorAll(".btn__text");
	shuffledEls.forEach((shuffledEl) => handleSingleShuffle(shuffledEl));
}
