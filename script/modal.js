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

  openCloseModal() {
    const modal = document.querySelector(".__modal");
    modal.classList.toggle("__active");
  }

  closeModal() {
    const close = document.querySelector(".__close-modal");
    close.addEventListener;
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
