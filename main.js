import ActiveMenuHamburger from "./script/active-menu-hanburger.js";
import AnimaScroll from "./script/anima-scroll.js";

const menu_hanburger = new ActiveMenuHamburger(".__menu-hamburger");
menu_hanburger.init();

const anima_section = new AnimaScroll("[data-anima]");
anima_section.init();
