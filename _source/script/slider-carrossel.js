export default class SliderCarrossel {
  constructor(dt_slider) {
    this.dt_slider = document.querySelector(dt_slider);

    this.configuration();

    this.controls[0].classList.add("__desabled");
  }

  leftMove(targ) {
    const width_item = this.last_child.clientWidth;

    this.controls[1].classList.remove("__desabled");

    this.slider_wrapp.scrollLeft -= width_item;

    if (this.first_child.getBoundingClientRect().left > 0)
      targ.target.classList.add("__desabled");
  }

  rightMove(targ) {
    const width_item = this.last_child.clientWidth;
    const percent_item = width_item * 0.2;

    this.controls[0].classList.remove("__desabled");

    this.slider_wrapp.scrollLeft += width_item;

    if (
      this.last_child.getBoundingClientRect().right - percent_item <
      this.dt_slider.clientWidth
    )
      targ.target.classList.add("__desabled");
  }

  eventClick() {
    this.controls.forEach((el) => {
      el.addEventListener("click", (targ) => {
        if (targ.target.classList.contains("prev")) {
          this.leftMove(targ);
        } else {
          this.rightMove(targ);
        }
      });
    });
  }

  configuration() {
    this.controls = this.dt_slider.querySelectorAll(".__btn");
    this.slider_wrapp = this.dt_slider.querySelector(".__slider-items");

    this.first_child = this.slider_wrapp.firstElementChild;
    this.last_child = this.slider_wrapp.lastElementChild;

    this.move = 0;
  }

  eventBind() {
    this.eventClick = this.eventClick.bind(this);
  }

  init() {
    this.eventBind();
    this.eventClick();
    return this;
  }
}
