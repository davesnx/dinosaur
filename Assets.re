module Assets = {
  module Sky = {
    let height = 128;
    let width = 256;
    let image = "sky.png";
  };
  module Enemy = {
    module Small = {
      let width = 38;
      let height = 42;
      let image = "Cactus.png";
    };
    module Big = {
      let width = 35;
      let height = 57;
      let image = "Cactus.png";
    };
  };
  module Dino = {
    let height = 48;
    let width = 48;
    let image01 = "Dino.png";
    let image02 = "Dino-step.png";
    let image03 = "Dino-jump.png";
    let image04 = "Dino-death.png";
  };
  module Land = {
    let image = "floor.png";
    let width = 600;
    let height = 8;
  };
};
