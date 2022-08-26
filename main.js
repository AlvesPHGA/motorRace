import SliderCarrossel from "./_source/script/slider-carrossel.js";

import InfiniteSlider from "./_source/script/infinite-slider.js";

const sliderMoto = new SliderCarrossel(
  "[data-carrossel=motos]",
  ".slider-items"
);
sliderMoto.init();

const subheaderSlider = new InfiniteSlider(
  "[data-slider=infinite-slider]",
  ".__slider-contents"
);

subheaderSlider.init();
