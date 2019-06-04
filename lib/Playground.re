open Revery;
let render = elem => {
  let init = app => {
    let createOptions =
      WindowCreateOptions.create(~width=800, ~height=600, ());
    let win = App.createWindow(~createOptions, app, "Dinosaur Revery");

    let _ = UI.start(win, elem);
    ();
  };

  App.start(init);
};
