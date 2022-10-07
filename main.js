import ActiveMenuHamburger from "./script/active-menu-hanburger.js";
import ActiveCard from "./script/active-card-support.js";

const menu_hanburger = new ActiveMenuHamburger(".__menu-hamburger");
menu_hanburger.init();

const cards = new ActiveCard(".__card");
cards.init();
