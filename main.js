import SliderNav from "./_source/script/slider-motos.js";

const sliderMoto = new SliderNav("[data-slider=motos]", ".slider-items");

sliderMoto.init();
sliderMoto.addArrow("[data-slider=previous]", "[data-slider=next]");
