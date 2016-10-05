import { observable } from 'mobx'
import { START } from 'constants'

class GameStore {
  @observable game = {
    status: START,
    level: 0
  }

  @observable distance = {
    x: 0
  }

  @observable dinosaur = {
    alive: true,
    position: {
      y: 0
    }
  }
}

export default new GameStore()
