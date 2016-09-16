import { observable } from 'mobx'

class GameStore {
  @observable dinoPosition = { x: 0, y: 0 }
}

export default new GameStore()
