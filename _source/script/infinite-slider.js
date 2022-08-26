export default class InfiniteSlider {
  constructor(dt_slider, content_slider) {
    this.dt_slider = document.querySelector(dt_slider);
    this.content_slider = document.querySelector(content_slider);

    const last_child = this.content_slider.lastElementChild;

    this.content_slider.insertAdjacentElement("afterbegin", last_child);
  }

  startSlider() {
    if (this.content_slider.dataset.slider === "auto-slider") this.autoSlider();
  }

  nextItem() {
    let first_element = this.content_slider.firstElementChild;

    this.content_slider.style.marginLeft = `-${
      first_element.getBoundingClientRect().width * 2
    }px`;

    this.content_slider.style.transition = "margin-left .7s ease";

    setTimeout(() => {
      this.content_slider.style.transition = "none";
      this.content_slider.insertAdjacentElement("beforeend", first_element);
      this.content_slider.style.marginLeft = `-${
        first_element.getBoundingClientRect().width
      }px`;
    }, 900);
  }

  autoSlider() {
    setInterval(() => this.nextItem(), 3000);
  }

  init() {
    this.startSlider();
    return this;
  }
}
