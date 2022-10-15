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

    fields.forEach((f) => {
      if (!f.value) {
        f.classList.add("__error");
      } else {
        this.validField(f);
      }
    });
  }

  validField(field) {
    if (field.name === "name") this.validName(field);
    if (field.name === "email") this.validEmail(field);
    if (field.name === "phone") this.validPhone(field);
  }

  validName(element) {
    const dataName = element.value;

    if (dataName.length < 3) element.classList.add("__error");
  }
  validEmail(element) {
    const dataEmail = element.value;
    const elRegex = /(\w+)\S@(\w{2,}).(\w{3,})/;

    if (!dataEmail.match(elRegex)) element.classList.add("__error");
  }
  validPhone(element) {
    console.log(element);
  }

  init() {
    this.validForm();
    return this;
  }
}
