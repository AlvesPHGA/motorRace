export class Slider {
  constructor(dt_slider, slider) {
    this.dt_slider = document.querySelector(dt_slider);
    this.slider = document.querySelector(slider);

    this.position = {
      last: 0,
      start: 0,
      movement: 0,
    };

    this.changeEvent = new Event("changeEvent");
  }

  // utils
  itemsTransition(active) {
    this.slider.style.transition = active ? "transform .3s" : "";
  }

  changeActiveItem() {
    this.items_array.forEach((i) => i.item.classList.remove("__active-item"));
    this.items_array[this.index_item.active].item.classList.add(
      "__active-item"
    );
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

    this.checkBoudary();
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

    this.changeActiveItem();

    this.slider.dispatchEvent(this.changeEvent);
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

  checkBoudary() {
    const slider = this.dt_slider.getBoundingClientRect();
    const inside = this.slider.getBoundingClientRect();

    if (inside.left > 0) this.slider.style.transform = `translate3d(0, 0, 0)`;
  }

  onRisize() {
    setTimeout(() => {
      this.itemOfSliderConfig();
      this.changeItemSlider(this.index_item.active);
    }, 1000);
  }

  addRisizeEvent() {
    window.addEventListener("resize", this.onRisize);
  }

  eventBind() {
    this.startSlider = this.startSlider.bind(this);
    this.onSliderMove = this.onSliderMove.bind(this);
    this.offSliderMove = this.offSliderMove.bind(this);

    this.activePreviousItem = this.activePreviousItem.bind(this);
    this.activeNextItem = this.activeNextItem.bind(this);

    this.onRisize = this.onRisize.bind(this);
  }

  init() {
    this.eventBind();
    this.onRisize();
    this.itemsTransition(true);
    this.eventsListener();
    this.itemOfSliderConfig();
    this.changeItemSlider(0);
    return this;
  }
}

export class SliderNav extends Slider {
  constructor(dt_slider, slider) {
    super(dt_slider, slider);
    this.eventBindCounters();
  }

  addArrow(previous, next) {
    this.previous_element = document.querySelector(previous);
    this.next_element = document.querySelector(next);

    this.addArrowEvent();
  }

  addArrowEvent() {
    this.previous_element.addEventListener("click", this.activePreviousItem);
    this.next_element.addEventListener("click", this.activeNextItem);
  }

  createCounters() {
    const counters = document.querySelector(".slider-counters");

    this.items_array.forEach((item, index) => {
      counters.innerHTML += ` 
        <span class = "__counter"><a href = '#item${index + 1}'></a></span>
      `;
    });

    return counters;
  }

  activeCounter() {
    this.counters_array.forEach((i) => {
      i.classList.remove("__active-counter");
    });
    this.counters_array[this.index_item.active].classList.add(
      "__active-counter"
    );
  }

  eventToCounters(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeItemSlider(index);
    });

    this.slider.addEventListener("changeEvent", this.activeCounter);
  }

  addCounters(custom_counters) {
    this.counter =
      document.querySelector(custom_counters) || this.createCounters();

    this.counters_array = [...this.counter.children];

    this.activeCounter();
    this.counters_array.forEach(this.eventToCounters);
  }

  eventBindCounters() {
    this.eventToCounters = this.eventToCounters.bind(this);
    this.activeCounter = this.activeCounter.bind(this);
  }
}
