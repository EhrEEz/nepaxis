import "../scss/styles.scss";
import { initNavBar } from "./components/menu";
import { initHeroITLTimes } from "./components/time";
import { initAnimations } from "./animations";
import { initLoading } from "./components/loader";
document.addEventListener("DOMContentLoaded", () => {
	initHeroITLTimes();
	initNavBar();
	initAnimations();
	initLoading();
});
