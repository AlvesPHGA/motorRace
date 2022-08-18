export default class SliderCarrossel {
  constructor(dt_slider, slider_items) {
    this.dt_slider = document.querySelector(dt_slider);
    this.slider_items = document.querySelector(slider_items);

    this.previous = document.querySelector(".previous");
    this.next = document.querySelector(".next");

    this.previous.classList.add("__desabled");

    this.moving = {
      final_position: 0,
      start_x: 0,
      movement: 0,
    };
  }

  leftMove() {
    const width_item = this.slider_items.lastElementChild.clientWidth;
    const item_slider_items = this.slider_items.firstElementChild;

    this.slider_items.scrollLeft -= width_item;

    if (item_slider_items.getBoundingClientRect().left > 0)
      this.previous.classList.add("__desabled");
  }

  rightMove() {
    const item_slider_items = this.slider_items.lastElementChild;
    const width_item = this.slider_items.lastElementChild.clientWidth;
    const percent_item = width_item * 0.2;

    this.slider_items.scrollLeft += width_item;

    if (
      item_slider_items.getBoundingClientRect().right - percent_item <
      this.dt_slider.clientWidth
    )
      this.next.classList.add("__desabled");
  }

  touchMove(move_position) {
    this.slider_items.style.left = `${move_position - this.moving.start_x}px`;
    this.checkBoudary();
  }

  checkBoudary() {
    const slider = this.dt_slider.getBoundingClientRect();
    const inside_slider = this.slider_items.getBoundingClientRect();

    const slider_items_style_left = parseInt(this.slider_items.style.left);

    if (slider_items_style_left > 0) this.slider_items.style.left = "0px";

    if (inside_slider.right < slider.right)
      this.slider_items.style.left = `-${inside_slider.width - slider.width}px`;
  }

  previousNextButtons() {
    this.eventClick();
  }

  eventTouch() {
    this.dt_slider.addEventListener("touchstart", (ev) => {
      this.moving.start_x =
        ev.changedTouches[0].clientX - this.slider_items.offsetLeft;
    });

    this.dt_slider.addEventListener("touchmove", (ev) => {
      this.moving.final_position = ev.changedTouches[0].clientX;

      this.touchMove(this.moving.final_position);
    });

    // this.dt_slider.addEventListener("touchend", (ev) => this.touchEndMove(ev));
  }

  eventClick() {
    this.previous.addEventListener("click", () => {
      this.next.classList.remove("__desabled");
      this.leftMove();
    });

    this.next.addEventListener("click", () => {
      this.previous.classList.remove("__desabled");
      this.rightMove();
    });
  }

  eventBind() {
    this.eventClick = this.eventClick.bind(this);
    this.leftMove = this.leftMove.bind(this);

    this.eventTouch = this.eventTouch.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.checkBoudary = this.checkBoudary.bind(this);
  }

  init() {
    this.eventBind();
    this.eventTouch();
    this.eventClick();
    return this;
  }
}
