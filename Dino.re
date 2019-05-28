open Revery;
open Revery.Math;
open Revery.UI;
open Revery.UI.Components;

open Constants;
open Assets;

let dino = (~children as _, ~y, ~isJumping, ~hasCollisioned, ~time, ()) => {
  let image = switch (time mod 3, hasCollisioned, isJumping) {
    | (0, false, false) => Assets.Dino.image01
    | (1, false, false) => Assets.Dino.image02
    | (2, false, false) => Assets.Dino.image03
    | (3, false, false) => Assets.Dino.image02
    | (_, true) => Assets.Dino.image04
  };

  <Positioned top=y left=Constants.dinoX>
    <Image
      src=image
      width=Assets.Dino.width
      height=Assets.Dino.height
    />
  </Positioned>
};

let ground = (~children as _, ()) => {
  <Positioned bottom=0 left=0>
    <Image
      src=Assets.Land.image
      width=Constants.width
      height=Assets.Land.height
      resizeMode=ImageResizeMode.Repeat
    />
  </Positioned>
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
  module Dino = {
    type t = {
      position: float,
      velocity: float,
      acceleration: float,
      isJumping: bool,
    };

    let minimumPosition =
      Constants.height
      - Assets.Land.height
      - Assets.Dino.height
      |> float_of_int;

    let initialState: t = {
      position: 150.,
      velocity: 100.,
      acceleration: 0.,
      isJumping: false,
    };

    let applyGravity = (time: float, dino: t) => {
      let velocity = dino.velocity +. dino.acceleration *. time;
      let acceleration = dino.acceleration +. Constants.gravity *. time;
      let position =
        min(minimumPosition, dino.position +. dino.velocity *. time);

      {
        position,
        velocity,
        acceleration,
        isJumping: position != minimumPosition,
      };
    };

    let flap = (dino: t) => {
      ...dino,
      position: dino.position,
      velocity: Constants.flapForce,
      acceleration: 0.,
    };

    let getRectangle = (dino: t) => {
      let x = Constants.dinoX |> float_of_int;
      let y = dino.position;
      let width = Assets.Dino.width |> float_of_int;
      let height = Assets.Dino.height |> float_of_int;
      Rectangle.create(~x, ~y, ~width, ~height, ());
    };
  };

  module Enemy = {
    type size =
      | Big
      | Small;

    type t = {
      width: Revery.Math.Rectangle.t,
      height: Revery.Math.Rectangle.t,
      kind: size,
      image: string,
    };

    let create = (~x, ~enemyKind, ()) => {
      let kind = enemyKind ? Big : Small;

      let width =
        enemyKind ?
          float_of_int(Assets.Enemy.Small.width) :
          float_of_int(Assets.Enemy.Big.width);

      let height =
        enemyKind ?
          float_of_int(Assets.Enemy.Small.height) :
          float_of_int(Assets.Enemy.Big.height);

      let image = enemyKind
        ? Assets.Enemy.Small.image
        : Assets.Enemy.Big.image;

      let y = float_of_int(Constants.height) -. height;

      let almostRect = Rectangle.create(~x, ~y, ());

      {
        width: almostRect(~width, ~height),
        height: almostRect(~width, ~height),
        kind,
        image,
      };
    };

    let getX = (enemy: t) => Rectangle.getX(enemy.width);

    let step = (t: float, enemy: t) => {
      let translate = Rectangle.translate(~x=Constants.speed *. t *. (-1.));
      {
        ...enemy,
        width: translate(enemy.width),
        height: translate(enemy.height),
      };
    };

    let collides = (dino: Dino.t, enemy: t) => {
      let dinoRect = Dino.getRectangle(dino);
      let y = float_of_int(Constants.height) -. Rectangle.getHeight(enemy.height);
      let x = Rectangle.getX(enemy.width);
      let height = Rectangle.getHeight(enemy.height);
      let width = Rectangle.getWidth(enemy.width);

      let enemy = Rectangle.create(
        ~x,
        ~y,
        ~width,
        ~height,
        ()
      );

      Rectangle.intersects(dinoRect, enemy);
    };

    let collidesAny = (dino: Dino.t, enemies: list(t)) => {
      List.exists(collides(dino), enemies);
    };
  };

  type mode =
    | Gameplay
    | GameOver;

  type t = {
    enemies: list(Enemy.t),
    dino: Dino.t,
    time: float,
    mode
  };

  let initialState: t = {
    enemies: [],
    dino: Dino.initialState,
    time: 0._,
    mode: Gameplay,

  };

  type action =
    | CreateEnemy(bool)
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
    | CreateEnemy(enemyKind) =>
      let enemy =
        Enemy.create(~x=float_of_int(Constants.width), ~enemyKind, ());
      let enemies = [enemy, ...state.enemies];
      {...state, enemies};
    | Flap =>
      state.dino.isJumping ? state : {...state, dino: Dino.flap(state.dino)}
    | Step(deltaTime) => {
        enemies: List.map(Enemy.step(deltaTime), state.enemies),
        dino: Dino.applyGravity(deltaTime, state.dino),
        time: state.time +. deltaTime,
        mode: Enemy.collidesAny(state.dino, state.enemies)
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

let enemy = (~children as _, ~enemy: State.Enemy.t, ()) => {
  let x = State.Enemy.getX(enemy) |> int_of_float;
  let width = enemy.width |> Rectangle.getWidth |> int_of_float;
  let height = enemy.height |> Rectangle.getHeight |> int_of_float;
  let image = enemy.image;

  let top = Rectangle.getY(enemy.height) |> int_of_float;

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
          _ => dispatch(CreateEnemy(Random.bool())),
          hooks,
        );

      let enemies = List.map(p => <enemy enemy=p />, state.enemies);

      (
        hooks,
        <Center>
          <View ref={r => Focus.focus(r)} onKeyPress={_ => dispatch(Flap)} onMouseDown={_ => dispatch(Flap)}>
            <ClipContainer
              width=Constants.width
              height=Constants.height
              color=Colors.cornflowerBlue>
              // <sky />
              <ground />
              <View> ...enemies </View>
              <dino
                time={int_of_float(state.time)}
                isJumping={state.dino.isJumping}
                hasCollisioned={state.mode == GameOver}
                y={int_of_float(state.dino.position)}
              />
              <Text
                style=textStyle
                text={"Time: " ++ string_of_float(state.time)}
              />
              <Text
                style=textStyle
                text={"Position: " ++ string_of_float(state.dino.position)}
              />
            </ClipContainer>
          </View>
        </Center>,
      );
    });
};

Playground.render(<world />);
