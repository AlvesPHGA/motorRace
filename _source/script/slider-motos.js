export class SliderMotos {
  constructor(dt_slider, slider_items) {
    this.dtSlider = document.querySelector(dt_slider);
    this.sliderItems = document.querySelector(slider_items);

    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };

    this.activeClass = "__active-item";

    this.left_and_right = {
      left: 0,
      right: 0,
    };
  }

  transitionSlider(active) {
    this.sliderItems.style.trasition = active ? "transform .3s" : "";
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
    let moveType;

    if (ev.type === "mousedown") {
      ev.preventDefault();
      this.distance.startX = ev.clientX;
      moveType = "mousemove";
    } else {
      this.distance.startX = ev.changedTouches[0].clientX;
      moveType = "touchmove";
    }

    this.dtSlider.addEventListener(moveType, this.onMove);

    this.transitionSlider(false);
  }

  onMove(ev) {
    const pointerPosition =
      ev.type === "mousemove" ? ev.clientX : ev.changedTouches[0].clientX;

    const finalPosition = this.updatedPosition(pointerPosition);

    this.moveSlider(finalPosition);
    // this.leftMove(finalPosition);
  }

  endMove(ev) {
    const moveType = ev.type === "mouseup" ? "mousemove" : "touchmove";
    this.dtSlider.removeEventListener(moveType, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;

    this.transitionSlider(true);

    // this.changedSliderOnEnd();
  }

  leftMove(fPosition) {
    const pos = fPosition;
    if (pos) this.left_and_right.left -= 10;

    this.sliderItems.style.transform = `translate3d(${this.left_and_right.left}px, 0, 0)`;
  }

  changedSliderOnEnd() {
    if (this.distance.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlider();
    } else if (this.distance.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlider();
    } else {
      this.changeSlider(this.index.active);
    }
  }

  addSliderEvents() {
    this.dtSlider.addEventListener("mousedown", this.onStart);
    this.dtSlider.addEventListener("touchstart", this.onStart);
    this.dtSlider.addEventListener("mouseup", this.endMove);
    this.dtSlider.addEventListener("touchend", this.endMove);
  }

  //   configuration
  sliderPosition(slide) {
    const margin = (this.dtSlider.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  sliderConfig() {
    this.slideArray = [...this.sliderItems.children].map((el) => {
      const position = el.offsetLeft;

      return {
        position,
        el,
      };
    });
  }

  //   index
  sliderIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  //   change slide item
  changeSlider(index) {
    const activeSlider = this.slideArray[index];

    this.moveSlider(activeSlider.position);
    this.sliderIndexNav(index);

    this.distance.finalPosition = activeSlider.position;

    this.changedActiveClass();
  }

  changedActiveClass() {
    this.slideArray.forEach((item) =>
      item.el.classList.remove(this.activeClass)
    );
    this.slideArray[this.index.active].el.classList.add(this.activeClass);
  }

  // navegation
  activePrevSlider() {
    if (this.index.prev !== undefined) this.changeSlider(this.index.prev);
  }

  activeNextSlider() {
    if (this.index.next !== undefined) this.changeSlider(this.index.next);
  }

  onResize() {
    setTimeout(() => {
      this.sliderConfig();
      this.changeSlider(this.index.active);
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.endMove = this.endMove.bind(this);
    this.moveSlider = this.moveSlider.bind(this);
    this.addResizeEvent = this.addResizeEvent.bind(this);
    this.leftMove = this.leftMove.bind(this);
  }

  init() {
    this.bindEvent();
    this.transitionSlider(true);
    this.sliderConfig();
    this.addSliderEvents();
    this.addResizeEvent();
    return this;
  }
}

export default class SliderNav extends SliderMotos {
  addArrow(previous, next) {
    this.prevElement = document.querySelector(previous);
    this.nextElement = document.querySelector(next);

    this.prevElement.addEventListener("click", this.leftMove);
  }
}
