import { START, STARTED, STOP, STOPED, JUMP, MOVE } from 'constants'
import _ from 'lodash'
// import {freeze} from 'freezr'

const N_TICKS = 1000

const generateTicks = (leng) => {
  return _.fill(Array(leng), {})
    .map((t, i) => {
      if (i % 10 === 0 && i >= 20) return { haveEnemy: true, type: _.random(0, 3) }
      else return { haveEnemy: false }
    })
}

const INITIAL_STATE = {
  'distance': 0,
  'status': STOPED,
  'death': false,
  'ticks': {
    all: generateTicks(N_TICKS),
    subset: []
  }
}

function game (state = INITIAL_STATE, action) {
  switch (action.type) {
    case START:
      return { ...state, 'status': STARTED }
    case STOP:
      return { ...state, 'status': STOPED }
    case JUMP:
      return { ...state, 'isJumping': true }
    case MOVE:
      return {
        distance: N_TICKS - state.ticks.all.length,
        ticks: {
          all: [...state.ticks.all.splice(1)]
        }
      }
    default:
      return state
  }
}

export default game
