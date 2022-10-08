import ActiveMenuHamburger from "./script/active-menu-hanburger.js";
import AnimaScroll from "./script/anima-scroll.js";
import SliderScroll from "./script/slider-scroll.js";

const menu_hanburger = new ActiveMenuHamburger(".__menu-hamburger");
menu_hanburger.init();

const anima_section = new AnimaScroll("[data-anima]");
anima_section.init();

const slider_scroll = new SliderScroll(
  "[data-slider=scroll]",
  ".__slider-content"
);
slider_scroll.init();
