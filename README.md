### Dinosaur game build with Revery
The main idea of this repo was to learn Revery and native ReasonML.

The code is based on the Workshop made by Revery's team at React Europe 2019 (@brianphelps, @x & x). It consisted on create a Flappy Bird clone[LINK]. I turn it into the famous Google Chrome "No internet connection" Dinosaur game! [LINK]

Many thanks for the assets [DINO ASSETS]

## Run it locally

**Pre-requisities**

- npm (6.5 or higher)
- esy (version 0.5.7): `npm install -g esy@0.5.7`
- Follow additional platform-specific instructors:
  - Mac: https://github.com/revery-ui/revery/wiki/Building-&-Installing#for-macos-users
  - Linux: https://github.com/revery-ui/revery/wiki/Building-&-Installing#for-macos-users
  - Windows: https://github.com/revery-ui/revery/wiki/Building-&-Installing#for-windows-native
- VSCode + `reason-vscode` extension (Recommended)

<!-- The first-time build can take a while, as the entire compiler toolchain is being built. -->

1. `git clone http://github.com/davesnx/dinosaur`
2. `cd dinosaur`
3. `esy install`
4. `esy build`
5. `esy run` <-- That will popup a window where the game runs!

We'll also have a web environment set up, in case you have trouble getting a local environment or editor integration set up:

[Revery Workshop Playground](https://outrunlabs.com/revery/workshop)

### Roadmap
> or things that you could do to learn and improve the game
- Turn time into points
- Add debug toggle to display/not display the position
- Add therodactiles: Google Chrome dinosaur game have therodactiles that flies against the dinosaur when you cross 500 points.

## License

[MIT License](LICENSE)
