open Revery;
open Revery.Math;
open Revery.UI;
open Revery.UI.Components;
open Constants;

module Assets = {
  module Sky = {
    let height = 128;
    let width = 256;
    let image = "sky.png";
  };
  module Pipe = {
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
  module Bird = {
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

let bird = (~children as _, ~y, ~isJumping, ()) =>
  <Positioned top=y left=Constants.birdX>
    <Image
      src=Assets.Bird.image01
      width=Assets.Bird.width
      height=Assets.Bird.height
    />
  </Positioned>;

let ground = (~children as _, ~time, ()) => {
  let parallax =
    (-1.0)
    *. mod_float(time *. Constants.speed, float_of_int(Assets.Land.width))
    |> int_of_float;

  <Positioned bottom=0 left=0>
    <Stack width=Constants.width height=Constants.floorHeight>
      <Positioned bottom=0 left=parallax>
        <Image
          src=Assets.Land.image
          width=Constants.width
          height=Assets.Land.height
          resizeMode=ImageResizeMode.Repeat
        />
      </Positioned>
      <Positioned bottom=0 left={parallax + Assets.Land.width}>
        <Image
          src=Assets.Land.image
          width=Constants.width
          height=Assets.Land.height
          resizeMode=ImageResizeMode.Repeat
        />
      </Positioned>
    </Stack>
  </Positioned>;
};

let sky = (~children as _, ()) =>
  <Positioned bottom=0 left=0>
    <Image
      src=Assets.Sky.image
      width=Constants.width
      height=Assets.Sky.height
      resizeMode=ImageResizeMode.Repeat
    />
  </Positioned>;

let textStyle =
  Style.[
    fontFamily("Roboto-Regular.ttf"),
    fontSize(24),
    color(Colors.white),
  ];

module State = {
  module Bird = {
    type t = {
      position: float,
      velocity: float,
      acceleration: float,
      isJumping: bool,
    };

    let minimumPosition =
      Constants.height
      - Assets.Land.height
      - Assets.Bird.height
      |> float_of_int;

    let initialState: t = {
      position: 150.,
      velocity: 100.,
      acceleration: 0.,
      isJumping: false,
    };

    let applyGravity = (time: float, bird: t) => {
      let velocity = bird.velocity +. bird.acceleration *. time;
      let acceleration = bird.acceleration +. Constants.gravity *. time;
      let position =
        min(minimumPosition, bird.position +. bird.velocity *. time);

      {
        position,
        velocity,
        acceleration,
        isJumping: position != minimumPosition,
      };
    };

    let flap = (bird: t) => {
      ...bird,
      position: bird.position,
      velocity: Constants.flapForce,
      acceleration: 0.,
    };

    let getRectangle = (bird: t) => {
      let x = Constants.birdX |> float_of_int;
      let y = bird.position;
      let width = Assets.Bird.width |> float_of_int;
      let height = Assets.Bird.height |> float_of_int;
      Rectangle.create(~x, ~y, ~width, ~height, ());
    };
  };

  module Pipe = {
    type size =
      | Big
      | Small;

    type t = {
      width: Revery.Math.Rectangle.t,
      height: Revery.Math.Rectangle.t,
      kind: size,
      image: string,
    };

    let create = (~x, ~pipeKind, ()) => {
      let kind = pipeKind ? Big : Small;

      let width =
        pipeKind ?
          float_of_int(Assets.Pipe.Small.width) :
          float_of_int(Assets.Pipe.Big.width);

      let height =
        pipeKind ?
          float_of_int(Assets.Pipe.Small.height) :
          float_of_int(Assets.Pipe.Big.height);

      let image = pipeKind
        ? Assets.Pipe.Small.image
        : Assets.Pipe.Big.image;

      let y = float_of_int(Constants.height) -. height;

      let almostRect = Rectangle.create(~x, ~y, ());

      {
        width: almostRect(~width, ~height),
        height: almostRect(~width, ~height),
        kind,
        image,
      };
    };

    let getX = (pipe: t) => Rectangle.getX(pipe.width);

    let step = (t: float, pipe: t) => {
      let translate = Rectangle.translate(~x=Constants.speed *. t *. (-1.));
      {
        ...pipe,
        width: translate(pipe.width),
        height: translate(pipe.height),
      };
    };

    let collides = (bird: Bird.t, pipe: t) => {
      let birdRect = Bird.getRectangle(bird);
      let y = float_of_int(Constants.height) -. Rectangle.getHeight(pipe.height);
      let x = Rectangle.getX(pipe.width);
      let height = Rectangle.getHeight(pipe.height);
      let width = Rectangle.getWidth(pipe.width);

      let enemy = Rectangle.create(
        ~x,
        ~y,
        ~width,
        ~height,
        ()
      );

      Rectangle.intersects(birdRect, enemy);
    };

    let collidesAny = (bird: Bird.t, pipes: list(t)) => {
      List.exists(collides(bird), pipes);
    };
  };

  type mode =
    | Gameplay
    | GameOver;

  type t = {
    pipes: list(Pipe.t),
    bird: Bird.t,
    time: float,
    mode
  };

  let initialState: t = {
    pipes: [],
    bird: Bird.initialState,
    time: 0._,
    mode: Gameplay,

  };

  type action =
    | CreatePipe(bool)
    | Flap
    | Step(float)
    | None;

  let gameOverReducer = (action, state) =>
    switch (action) {
      | Flap => initialState
      | _ => state
    };

  let gameplayReducer = (action, state: t) =>
    switch (action) {
    | CreatePipe(pipeKind) =>
      let pipe =
        Pipe.create(~x=float_of_int(Constants.width), ~pipeKind, ());
      let pipes = [pipe, ...state.pipes];
      {...state, pipes};
    | Flap =>
      state.bird.isJumping ? state : {...state, bird: Bird.flap(state.bird)}
    | Step(deltaTime) => {
        pipes: List.map(Pipe.step(deltaTime), state.pipes),
        bird: Bird.applyGravity(deltaTime, state.bird),
        time: state.time +. deltaTime,
        mode: Pipe.collidesAny(state.bird, state.pipes)
            ? GameOver : Gameplay
      }
    | None => state
    };


  let reducer = (action, state: t) =>
  switch (state.mode) {
    | Gameplay => gameplayReducer(action, state)
    | GameOver => gameOverReducer(action, state)
  };
};

let pipe = (~children as _, ~pipe: State.Pipe.t, ()) => {
  let x = State.Pipe.getX(pipe) |> int_of_float;
  let width = pipe.width |> Rectangle.getWidth |> int_of_float;
  let height = pipe.height |> Rectangle.getHeight |> int_of_float;
  let image = pipe.image;

  let top = Rectangle.getY(pipe.height) |> int_of_float;

  <View>
    <Positioned top left=x>
      <Image src=image width height />
    </Positioned>
  </View>
  ;
};

let world = {
  let component = React.component("world");

  (~children as _: list(React.syntheticElement), ()) =>
    component(hooks => {
      let (state, dispatch, hooks) =
        Hooks.reducer(~initialState=State.initialState, State.reducer, hooks);

      let hooks =
        Hooks.tick(
          ~tickRate=Seconds(0.),
          t => dispatch(Step(Time.toSeconds(t))),
          hooks,
        );

      let hooks =
        Hooks.tick(
          ~tickRate=Seconds(4.),
          _ => dispatch(CreatePipe(Random.bool())),
          hooks,
        );

      let pipes = List.map(p => <pipe pipe=p />, state.pipes);

      (
        hooks,
        <Center>
          <View onMouseDown={_ => dispatch(Flap)}>
            <ClipContainer
              width=Constants.width
              height=Constants.height
              color=Colors.cornflowerBlue>
              <sky />
              <ground time={state.time} />
              <View> ...pipes </View>
              <bird
                isJumping={state.bird.isJumping}
                y={int_of_float(state.bird.position)}
              />
              <Text
                style=textStyle
                text={"Time: " ++ string_of_float(state.time)}
              />
              <Text
                style=textStyle
                text={"Position: " ++ string_of_float(state.bird.position)}
              />
            </ClipContainer>
          </View>
        </Center>,
      );
    });
};

Playground.render(<world />);
