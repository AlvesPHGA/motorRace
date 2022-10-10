export default class Modal {
  constructor(dt_modal, close) {
    this.dt_modal = document.querySelectorAll(dt_modal);
    this.close = document.querySelector(close);
  }

  eventClick() {
    this.dt_modal.forEach((m) => {
      m.addEventListener("click", this.openCloseModal);
    });

    this.close.addEventListener("click", this.openCloseModal);
  }

  openCloseModal(item) {
    const modal = document.querySelector(".__modal");
    const image = item.path[0].src;

    modal.classList.toggle("__active");
    console.log(item);
    this.contentModal(image);
  }

  contentModal(element) {
    const content = document.querySelector(".__modal-content");

    content.innerHTML = `<img class = '__image-modal' src = '${element}'>`;
  }

  eventBind() {
    this.openCloseModal = this.openCloseModal.bind(this);
  }

  init() {
    this.eventBind();
    this.eventClick();
    return this;
  }
}
