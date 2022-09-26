export default class SliderInfinite {
  constructor(dt_slider, slider_contents) {
    this.dt_slider = document.querySelector(dt_slider);
    this.slider_contents = document.querySelector(slider_contents);

    this.previous = this.dt_slider.querySelector(".__btn-prev");
    this.next = this.dt_slider.querySelector(".__btn-next");

    const last_element = this.slider_contents.lastElementChild;
    this.slider_contents.insertAdjacentElement("afterbegin", last_element);
  }

  clickArrows() {
    this.previous.addEventListener("click", this.prevItem);
    this.next.addEventListener("click", this.nextItem);
  }

  prevItem(el) {
    this.styleLeft(el);
    this.timeout(el);
  }

  nextItem(el) {
    this.styleLeft(el);
    this.timeout(el);

    this.positionItems();
  }

  styleLeft(el) {
    let margin_left;

    if (el.target.alt === "back") {
      margin_left = "0";
    } else {
      margin_left = "-200%";
    }

    this.slider_contents.style.marginLeft = margin_left;
    this.slider_contents.style.transition = "margin-left .7s ease";
  }

  timeout(el) {
    let direction, element;

    if (el.target.alt === "back") {
      direction = "afterbegin";
      element = this.slider_contents.lastElementChild;
    } else {
      direction = "beforeend";
      element = this.slider_contents.firstElementChild;
    }

    setTimeout(() => {
      this.slider_contents.style.transition = "none";
      this.slider_contents.insertAdjacentElement(direction, element);
      this.slider_contents.style.marginLeft = "-100%";
    }, 900);
  }

  automaticSlider() {
    setInterval(() => {
      let first = this.slider_contents.firstElementChild;

      this.slider_contents.style.marginLeft = "-200%";
      this.slider_contents.style.transition = "margin-left .7s ease";

      setTimeout(() => {
        this.slider_contents.style.transition = "none";
        this.slider_contents.insertAdjacentElement("beforeend", first);
        this.slider_contents.style.marginLeft = "-100%";
      }, 900);
    }, 4000);
  }

  eventBind() {
    this.prevItem = this.prevItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
  }

  init() {
    this.eventBind();
    //  this.clickArrows();
    this.automaticSlider();
    return this;
  }
}
