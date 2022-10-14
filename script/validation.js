export default class Validation {
  constructor(validation_form) {
    this.validation_form = document.querySelector(validation_form);
  }

  validForm() {
    this.validation_form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      this.inputs();
    });
  }

  inputs() {
    const fields = this.validation_form.querySelectorAll("[data-required]");
    console.log(fields);
  }

  init() {
    this.validForm();
    return this;
  }
}
