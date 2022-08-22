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

  // utils
  itemsTransition(active) {
    this.slider.style.transition = active ? "transform .3s" : "";
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

    this.itemsTransition(false);
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

    this.itemsTransition(true);

    this.changeItemOffSliderMove();
  }

  moveSlider(distX) {
    this.position.new = distX;
    this.slider.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  changeItemOffSliderMove() {
    if (
      this.position.movement > this.dt_slider.offsetWidth / 2 &&
      this.index_item.next !== undefined
    ) {
      this.activeNextItem();
    } else if (
      this.position.movement < this.dt_slider.offsetWidth / 2 &&
      this.index_item.prev !== undefined
    ) {
      this.activePreviousItem();
    } else {
      this.changeItemSlider(this.index_item.active);
    }
  }

  // position
  updatedPosition(clientX) {
    this.position.movement = (this.position.start - clientX) * 1.1;
    return this.position.last - this.position.movement;
  }

  // config item of slider
  itemOfSliderConfig() {
    this.items_array = [...this.slider.children].map((item) => {
      const position_item = this.itemOfSliderPosition(item);

      return {
        position_item,
        item,
      };
    });

    console.log(this.items_array);
  }

  itemOfSliderPosition(item) {
    const field_margin = this.slider.offsetWidth - item.offsetWidth;

    return -(item.offsetLeft - field_margin);
  }

  changeItemSlider(index) {
    const active_item = this.items_array[index];

    this.itemIndexOfSlider(index);
    this.moveSlider(active_item.position_item);

    this.position.last = active_item.position_item;
  }

  itemIndexOfSlider(index) {
    const last_item = this.items_array.length - 1;

    this.index_item = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last_item ? undefined : index + 1,
    };
  }

  // previous & next
  activePreviousItem() {
    if (this.index_item.prev !== undefined)
      this.changeItemSlider(this.index_item.prev);
  }

  activeNextItem() {
    if (this.index_item.next !== undefined)
      this.changeItemSlider(this.index_item.next);
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
    this.itemsTransition(true);
    this.eventsListener();
    this.itemOfSliderConfig();
    return this;
  }
}
