import "../scss/styles.scss";
import { initNavBar } from "./components/menu";
import { initHeroITLTimes } from "./components/time";
import { initAnimations } from "./animations";
import { initLoading } from "./components/loader";
import { handleContact } from "./components/contact";
import { handleNewsLetter } from "./components/newsletter";

document.addEventListener("DOMContentLoaded", () => {
	initHeroITLTimes();
	initNavBar();
	initAnimations();
	initLoading();
	handleContact();
	handleNewsLetter();
});
