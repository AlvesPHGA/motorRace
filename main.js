import SliderInfinite from "./_source/script/slider-infinite.js";
import SliderScroll from "./_source/script/slider-scroll.js";

const sliderSubheader = new SliderInfinite(
  "[data-slider=infinite-slider]",
  ".__slider-contents"
);
sliderSubheader.init();

const sliderMotos = new SliderScroll(
  "[data-carrossel=motos]",
  ".__slider-items"
);
sliderMotos.init();
