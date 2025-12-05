export function initHeroITLTimes() {
	const time_fields = document.querySelectorAll("[data-timezone]");
	setInterval(() => {
		time_fields.forEach((emt) => {
			const timeZone = emt.getAttribute("data-timezone");
			const time = new Intl.DateTimeFormat("en-US", {
				timeZone: timeZone as string,
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			}).format();
			emt.innerHTML = time;
		});
	}, 1000);
}
