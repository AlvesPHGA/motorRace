import SliderCarrossel from "./_source/script/slider-carrossel.js";
import Slider from "./_source/script/slider.js";

const sliderMoto = new SliderCarrossel(
  "[data-carrossel=motos]",
  ".slider-items"
);
sliderMoto.init();

const sliderShow = new Slider("[data-slider]", ".__slider-contents");
sliderShow.init();
sliderShow.changeItemSlider(2);
