open Revery;
open Revery.Math;
open Revery.UI;
open Revery.UI.Components;

open Constants;
open Assets;

let dino = (~children as _, ~y, ~isJumping, ~hasCollisioned, ~time, ()) => {
  let image = switch (isJumping, hasCollisioned) {
    | (_, true) => Assets.Dino.Images.death
    | (true, _) => Assets.Dino.Images.jump
    | _ => switch (time mod 2) {
      | 0 => Assets.Dino.Images.step
      // | 1 => Assets.Dino.Images.step2
      | 1 => Assets.Dino.Images.default
    };
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
    />
  </Positioned>
};

let textStyle =
  Style.[
    fontFamily("Roboto-Regular.ttf"),
    fontSize(24),
    color(Color.hex("#444446")),
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

  module Cloud = {
    type t = {
      rect: Revery.Math.Rectangle.t,
    }

    let create = (~x) => {
      let width = Assets.Sky.width |> float_of_int;
      let height = Assets.Sky.height |> float_of_int;
      let y = Random.float(float_of_int(Constants.height) /. 2.);
      let x = float_of_int(Constants.width);
      let cloud = Rectangle.create(~x, ~y, ~width, ~height, ());

      {
        rect: cloud
      };
    };

    let step = (t: float, cloud: t) => {
      let translate = Rectangle.translate(~x=Constants.speed *. t *. (-1.));

      {
        rect: translate(cloud.rect)
      };
    };
  };

  module Enemy = {
    type size =
      | Big
      | Small;

    type t = {
      rect: Revery.Math.Rectangle.t,
      kind: size,
      image: string,
    };

    let create = (~x, ~enemyKind) => {
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

      {
        rect: Rectangle.create(~x, ~y, ~width, ~height, ()),
        kind,
        image,
      };
    };

    let getX = (enemy: t) => Rectangle.getX(enemy.rect);

    let step = (t: float, enemy: t) => {
      let translate = Rectangle.translate(~x=Constants.speed *. t *. (-1.));
      {
        ...enemy,
        rect: translate(enemy.rect),
      };
    };

    let collides = (dino: Dino.t, enemy: t) => {
      let enemyHeght = Rectangle.getHeight(enemy.rect)
      let y = float_of_int(Constants.height) -. enemyHeght;
      let x = Rectangle.getX(enemy.rect);
      let height = enemyHeght;
      let width = Rectangle.getWidth(enemy.rect);
      let dinoRect = Dino.getRectangle(dino);

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
    clouds: list(Cloud.t),
    dino: Dino.t,
    time: float,
    mode
  };

  let initialState: t = {
    enemies: [],
    clouds: [
      Cloud.create()
    ],
    dino: Dino.initialState,
    time: 0._,
    mode: Gameplay
  };

  type action =
    | CreateEnemy(bool)
    | CreateCloud
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
        Enemy.create(~x=float_of_int(Constants.width - 100), ~enemyKind);
      let enemies = [enemy, ...state.enemies];
      {...state, enemies};
    | CreateCloud =>
      let cloud = Cloud.create(~x=float_of_int(Constants.width));
      let clouds = [cloud, ...state.clouds];
      {...state, clouds};
    | Flap =>
      state.dino.isJumping ? state : {...state, dino: Dino.flap(state.dino)}
    | Step(deltaTime) => {
        enemies: List.map(Enemy.step(deltaTime), state.enemies),
        clouds: List.map(Cloud.step(deltaTime), state.clouds),
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
  let width = enemy.rect |> Rectangle.getWidth |> int_of_float;
  let height = enemy.rect |> Rectangle.getHeight |> int_of_float;
  let image = enemy.image;

  let top = Rectangle.getY(enemy.rect) |> int_of_float;

  <View>
    <Positioned top left=x>
      <Image src=image width height />
    </Positioned>
  </View>
  ;
};

let cloud = (~children as _, ~cloud: State.Cloud.t, ()) => {
  let x = Rectangle.getX(cloud.rect) |> int_of_float;
  let y = Rectangle.getY(cloud.rect) |> int_of_float;

  <Positioned top=y left=x>
    <Image
      src=Assets.Sky.image
      width=Assets.Sky.width
      height=Assets.Sky.height
    />
  </Positioned>;
};

let main = (~children, ()) => {
  let style =
      Style.[
        flexGrow(1),
        justifyContent(`Center),
        alignItems(`Center),
        backgroundColor(Constants.backgroundColor)
      ];

  <View style>
    ...children
  </View>
}

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

      let hooks =
        Hooks.tick(
          ~tickRate=Seconds(1.3),
          _ => dispatch(CreateCloud),
          hooks,
        );

      let enemies = List.map(p => <enemy enemy=p />, state.enemies);
      let clouds = List.map(c => <cloud cloud=c />, state.clouds);

      (
        hooks,
        <main>
          <Text
            style=textStyle
            text={"Time: " ++ string_of_int(int_of_float(state.time))}
          />
          <Text
            style=textStyle
            text={"Press click to jump"}
          />
          <View ref={r => Focus.focus(r)} onKeyPress={_ => dispatch(Flap)} onMouseDown={_ => dispatch(Flap)}>
            <ClipContainer
              width=Constants.width
              height=Constants.height
              color=Constants.backgroundColor>
              <View> ...clouds </View>
              <View> ...enemies </View>
              <dino
                time={int_of_float(state.time *. 10.)}
                isJumping={state.dino.isJumping}
                hasCollisioned={state.mode == GameOver}
                y={int_of_float(state.dino.position)}
              />
              <ground />
            </ClipContainer>
          </View>
        </main>,
      );
    });
};

Playground.render(<world />);
