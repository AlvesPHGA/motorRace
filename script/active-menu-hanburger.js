export default class ActiveMenuHamburger {
  constructor(element) {
    this.element = document.querySelector(element);
  }

  eventClick() {
    this.element.addEventListener("click", this.onOff);
  }

  onOff() {
    const box = document.querySelector(".__box");
    const menu = document.querySelector(".__links");

    box.classList.toggle("__active");
    menu.classList.toggle("__active-menu-mobile");
  }

  eventBind() {
    this.onOff = this.onOff.bind(this);
  }

  init() {
    this.eventBind();
    this.eventClick();
    return this;
  }
}
