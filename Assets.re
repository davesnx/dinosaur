module Assets = {
  module Sky = {
    let height = 128;
    let width = 256;
    let image = "sky.png";
  };
  module Enemy = {
    module Small = {
      let width = 35;
      let height = 55;
      let image = "PipeUp.png";
    };
    module Big = {
      let width = 55;
      let height = 70;
      let image = "PipeUp.png";
    };
  };
  module Dino = {
    let height = 32;
    let width = 32;
    let image01 = "bird-01.png";
    let image02 = "bird-02.png";
    let image03 = "bird-03.png";
    let image04 = "bird-04.png";
  };
  module Land = {
    let image = "land.png";
    let width = 256;
    let height = 32;
  };
};
