export default class Validation {
  constructor(validation_form) {
    this.validation_form = document.querySelector(validation_form);
  }

  event() {
    this.validation_form.addEventListener("submit", (ev) => {
      this.handleSubmit(ev);
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const validFields = this.validField();

    if (validFields) {
      alert("Formulario enviado com sucesso");
      this.validation_form.reset();
    }
  }

  validField() {
    const fields = this.validation_form.querySelectorAll("[data-required]");
    const errors = this.validation_form.querySelectorAll(".__error");

    let valid = true;

    errors.forEach((er) => er.classList.remove("__error"));

    fields.forEach((field) => {
      if (!field.value) {
        field.classList.add("__error");
        valid = false;
      } else {
        if (field.name === "name") {
          if (!this.validName(field)) valid = false;
        }
        if (field.name === "email") {
          if (!this.validEmail(field)) valid = false;
        }
        if (field.name === "phone") {
          if (!this.validPhone(field)) valid = false;
        }
      }
    });

    return valid;
  }

  validName(element) {
    const dataName = element.value;

    let valid = true;

    if (dataName.length < 3) {
      element.classList.add("__error");
      valid = false;
    }

    return valid;
  }

  validEmail(element) {
    const dataEmail = element.value;
    const elRegex = /(\w+)\S@(\w{2,}).(\w{3,})/;

    let valid = true;

    if (!dataEmail.match(elRegex)) {
      element.classList.add("__error");
      valid = false;
    }

    return valid;
  }

  validPhone(element) {
    const dataPhone = element.value;
    const elRegex = /(\(?[1-9]{2}\)?)(\-|\s)?(9?[2-9]{4})(-|\s)?([0-9]{4})/;

    let valid = true;

    if (!dataPhone.match(elRegex)) {
      element.classList.add("__error");
      valid = false;
    }

    return valid;
  }

  bindEvent() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  init() {
    this.bindEvent();
    this.event();
    return this;
  }
}
