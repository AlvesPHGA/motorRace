export default class SliderMotos {
  constructor(dt_slider, slider_items) {
    this.dtSlider = document.querySelector(dt_slider);
    this.sliderItems = document.querySelector(slider_items);
  }

  onStart(ev) {
    ev.preventDefault();
    console.log("mousedown");
    this.sliderItems.addEventListener("mousemove", this.onMove);
  }

  onMove(ev) {
    console.log("movendo");
  }

  endMove(ev) {
    this.sliderItems.removeEventListener("mousemove", this.onMove);
  }

  addSliderEvents() {
    this.sliderItems.addEventListener("mousedown", this.onStart);
    this.sliderItems.addEventListener("mouseup", this.endMove);
  }

  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.endMove = this.endMove.bind(this);
  }

  init() {
    this.bindEvent();
    this.addSliderEvents();
    return this;
  }
}
