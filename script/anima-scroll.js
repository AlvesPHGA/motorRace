export default class AnimaScroll {
  constructor(section) {
    this.sections = document.querySelectorAll(section);
  }

  eventAnima() {
    window.addEventListener("scroll", this.addClass);
  }

  addClass() {
    this.sections.forEach((section) => {
      let element = section.getBoundingClientRect().y;
      let window_top = window.innerHeight * 0.85;

      if (element < window_top) section.classList.add("__active");
    });
  }

  eventBind() {
    this.addClass = this.addClass.bind(this);
  }

  init() {
    this.eventBind();
    this.eventAnima();
    return this;
  }
}
