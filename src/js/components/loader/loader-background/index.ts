export function initCanvas(): ReturnType<typeof setInterval> | false {
	let bgEffectInterval: ReturnType<typeof setInterval>;
	const canvas: HTMLCanvasElement | null =
		document.querySelector("#loading-matrix");

	if (!canvas) return false;

	const ctx = canvas.getContext("2d");
	if (!ctx) return false;

	const w = (canvas.width = window.innerWidth);
	const h = (canvas.height = window.innerHeight);
	const cols = Math.floor(w / 20) + 1;
	const ypos = Array(cols).fill(0);

	ctx.fillStyle = "";
	ctx.fillRect(0, 0, w, h);

	function matrix() {
		if (!ctx) return;

		ctx.fillStyle = "#1515156f";
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = "#2c2c2c";
		ctx.font = "15pt 'Space Mono'";

		ypos.forEach((y, ind) => {
			const text = String.fromCharCode(Math.random() * 128);
			const x = ind * 20;
			ctx.fillText(text, x, y);
			if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
			else ypos[ind] = y + 20;
		});
	}

	bgEffectInterval = setInterval(matrix, 70);
	return bgEffectInterval;
}
