export function initNavBar(): void {
	const menuWrapper: HTMLDivElement | null =
		document.querySelector(".nav__main");
	const navCard: HTMLDivElement | null = document.querySelector(".nav__card");
	if (!menuWrapper) {
		console.warn("Navigation menu wrapper not found (.nav__main).");
		return;
	}

	const menuButton: HTMLButtonElement | null =
		menuWrapper.querySelector(".menu__btn");

	if (!menuButton) {
		console.warn("Navigation menu button not found (.menu__btn).");
		return;
	}

	const navLinks: NodeListOf<HTMLAnchorElement> =
		menuWrapper.querySelectorAll(".nav__list-link");

	menuButton.addEventListener("click", function (e: MouseEvent): void {
		e.stopPropagation();
		menuWrapper.classList.toggle("nav--toggled");
	});
	document.addEventListener("click", function (e: MouseEvent): void {
		if (navCard) {
			if (!navCard.contains(e.target as Node)) {
				menuWrapper.classList.remove("nav--toggled");
			}
		}
	});
	navLinks.forEach((link: HTMLAnchorElement) => {
		link.addEventListener("click", function (): void {
			menuWrapper.classList.remove("nav--toggled");
		});
	});
	document.addEventListener("keydown", function (e: KeyboardEvent): void {
		if (e.key === "Escape") {
			menuWrapper.classList.remove("show__list");
		}
	});
}
