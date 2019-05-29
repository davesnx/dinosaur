module Assets = {
  module Sky = {
    let height = 31;
    let width = 87;
    let image = "Cloud.png";
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
    let height = 60;
    let width = 60;

    module Images = {
      let default = "Dino.png";
      let step = "Dino-step.png";
      let jump = "Dino-jump.png";
      let death = "Dino-death.png";
    }
  };
  module Land = {
    let image = "floor.png";
    let width = 600;
    let height = 4;
  };
};
