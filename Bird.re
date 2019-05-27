open Revery;
open Revery.Math;
open Revery.UI;
open Revery.UI.Components;
open Constants;
open Assets;

let bird = (~children as _, ~y, ~isJumping, ()) =>
  <Positioned top=y left=Constants.birdX>
    <Image
      src=Assets.Bird.image01
      width=Assets.Bird.width
      height=Assets.Bird.height
    />
  </Positioned>;
