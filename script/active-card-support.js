export default class ActiveCard {
  constructor(cards) {
    this.cards = document.querySelectorAll(cards);
  }

  init() {
    return this;
  }
}
