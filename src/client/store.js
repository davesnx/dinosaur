import { observable } from 'mobx'
import { START, GAME_SIZE, DINO_SIZE } from './constants'

class AppStore {
  constructor () {
    setInterval(() => {
      this.distance += 10
    }, 200)
  }

  @observable status = START
  @observable level = 0
  @observable distance = 0
  @observable dinosaur = {
    alive: true,
    position: {
      x: 0,
      y: GAME_SIZE.HEIGHT - DINO_SIZE.HEIGHT
    }
  }

  jump () {
    this.dinosaur.position.y -= 10
  }

  @observable enemies = [
    {
      position: 0,
      size: 1
    }
  ]
}

export default AppStore
