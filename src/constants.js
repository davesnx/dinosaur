export const START = 'start'

class Size {
  constructor (w, h) {
    return {
      width: w,
      height: h
    }
  }
}

export const GAME_SIZE = new Size(600, 300)
export const SKY_SIZE = new Size(600, 200)
export const SKY_SIZE = new Size(600, 100)
export const DINO_SIZE = new Size(64, 64)
export const ENEMY_SIZE = new Size(25, 25)
