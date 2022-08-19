export default class Slider {
  constructor(dt_slider, slider) {
    this.dt_slider = document.querySelector(dt_slider);
    this.slider = document.querySelector(slider);

    this.position = {
      last: 0,
      start: 0,
      movement: 0,
    };
  }

  // move slider
  startSlider(ev) {
    let type_event;
    if (ev.type === "mousedown") {
      ev.preventDefault();
      this.position.start = ev.clientX;
      type_event = "mousemove";
    }

    this.dt_slider.addEventListener(type_event, this.onSliderMove);
  }

  onSliderMove(ev) {
    const pointer_position =
      ev.type === "mousemove" ? ev.clientX : ev.changedTouches[0].clientX;

    const position = this.updatedPosition(pointer_position);

    this.moveSlider(position);
  }

  offSliderMove(ev) {
    const move_type = ev.type === "mouseup" ? "mousemove" : "touchmove";

    this.dt_slider.removeEventListener(move_type, this.onSliderMove);

    this.position.last = this.position.new;
  }

  moveSlider(distX) {
    this.position.new = distX;
    this.slider.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  // position
  updatedPosition(clientX) {
    this.position.movement = (this.position.start - clientX) * 1.1;
    return this.position.last - this.position.movement;
  }

  //   setup of class
  eventsListener() {
    this.dt_slider.addEventListener("mousedown", this.startSlider);

    this.dt_slider.addEventListener("mouseup", this.offSliderMove);
  }

  eventBind() {
    this.startSlider = this.startSlider.bind(this);
    this.onSliderMove = this.onSliderMove.bind(this);
    this.offSliderMove = this.offSliderMove.bind(this);
  }

  init() {
    this.eventBind();
    this.eventsListener();
    return this;
  }
}
