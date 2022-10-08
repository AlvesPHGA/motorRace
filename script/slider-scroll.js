export default class SliderScroll {
  constructor(dt_slider, slider_content) {
    this.dt_slider = document.querySelector(dt_slider);

    this.slider_content = this.dt_slider.querySelector(slider_content);

    this.btn_previous = this.dt_slider.querySelector(".__previous");
    this.btn_next = this.dt_slider.querySelector(".__next");

    this.btn_previous.classList.add("__desabled");

    this.touch = {
      final: 0,
      start: 0,
    };
  }

  eventClick() {
    this.btn_previous.addEventListener("click", () => {
      this.btn_next.classList.remove("__desabled");
      this.leftMove();
    });
    this.btn_next.addEventListener("click", () => {
      this.btn_previous.classList.remove("__desabled");
      this.rightMove();
    });
  }

  leftMove() {
    const child_item = this.slider_content.firstElementChild;

    const res_calc =
      child_item.getBoundingClientRect().right -
      child_item.getBoundingClientRect().right * 0.95;

    this.slider_content.scrollLeft -= child_item.clientWidth;

    if (res_calc > 0) this.btn_previous.classList.add("__desabled");
  }

  rightMove() {
    const child_item = this.slider_content.lastElementChild;
    this.slider_content.scrollLeft += child_item.clientWidth;

    if (child_item.getBoundingClientRect().left < this.dt_slider.clientWidth)
      this.btn_next.classList.add("__desabled");
  }

  // ----
  touchEvent() {
    this.dt_slider.addEventListener("touchstart", (ev) => {
      this.touch.start =
        ev.changedTouches[0].clientX - this.slider_content.offsetLeft;
    });

    this.dt_slider.addEventListener("touchmove", (ev) => {
      this.touch.final = ev.changedTouches[0].clientX;

      this.touchMove(this.touch.final);
    });
  }

  touchMove(move_position) {
    this.slider_content.style.left = `${move_position - this.touch.start}px`;
    this.slider_content.style.translate = "left .9s ease";

    this.checkBoudary();
  }

  checkBoudary() {
    const slider = this.dt_slider.getBoundingClientRect();
    const slider_content = this.slider_content.getBoundingClientRect();

    const sytle_left = parseInt(this.slider_content.style.left);

    if (sytle_left > 0) this.slider_content.style.left = "0px";

    if (slider_content.right < slider.right)
      this.slider_content.style.left = `-${
        slider_content.width - slider.width
      }px`;
  }
  // ----

  eventBind() {
    this.leftMove = this.leftMove.bind(this);
    this.rightMove = this.rightMove.bind(this);

    this.touchMove = this.touchMove.bind(this);
  }

  init() {
    this.eventBind();
    this.eventClick();
    this.touchEvent();

    return this;
  }
}
