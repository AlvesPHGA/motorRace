export default class SliderMotos {
  constructor(dt_slider, slider_items) {
    this.dtSlider = document.querySelector(dt_slider);
    this.sliderItems = document.querySelector(slider_items);

    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlider(distX) {
    this.distance.movePosition = distX;
    this.sliderItems.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatedPosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.2;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(ev) {
    ev.preventDefault();
    console.log("mousedown");

    this.distance.startX = ev.clientX;

    this.dtSlider.addEventListener("mousemove", this.onMove);
  }

  onMove(ev) {
    const finalPosition = this.updatedPosition(ev.clientX);
    this.moveSlider(finalPosition);
  }

  endMove(ev) {
    this.dtSlider.removeEventListener("mousemove", this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addSliderEvents() {
    this.dtSlider.addEventListener("mousedown", this.onStart);
    this.dtSlider.addEventListener("mouseup", this.endMove);
  }

  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.endMove = this.endMove.bind(this);
    this.moveSlider = this.moveSlider.bind(this);
  }

  init() {
    this.bindEvent();
    this.addSliderEvents();
    return this;
  }
}
