import { ACTIONS, STATE } from 'constants'
import _ from 'lodash'
// import {freeze} from 'freezr'

const N_TICKS = 1000

// TODO: Create the reducer for generateTicks with more parameters
//       - Implement the subset of ticks!
//       - Create also the action for upgrade level(?)
const generateTicks = (leng) => {
  return _.fill(Array(leng), {})
    .map((t, i) => {
      if (i % 10 === 0 && i >= 20) return { haveEnemy: true, type: _.random(0, 3) }
      else return { haveEnemy: false }
    })
}

const INITIAL_STATE = {
  distance: 0,
  game: {
    status: STATE.STOPED
  },
  dino: {
    status: STATE.ALIVE,
    isJumping: true
  },
  ticks: {
    all: generateTicks(N_TICKS)
    // subset: [] // For create a pagination number of ticks!
  }
}

const isCollision = (f, s) => {
  return !(
    ((f.top + f.height) < (s.top)) || (f.top > (s.top + s.height)) ||
    ((f.left + f.width) < s.left) || (f.left > (s.left + s.width))
  )
}

function game (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        game: { status: STATE.STARTED }
      }
    case ACTIONS.STOP:
      return {
        ...state,
        game: { status: STATE.STOPED }
      }
    case ACTIONS.JUMP:
      return {
        ...state,
        dino: { isJumping: true }
      }
    case ACTIONS.MOVE:
      return {
        distance: N_TICKS - state.ticks.all.length,
        ticks: {
          all: [...state.ticks.all.splice(1)]
        }
      }
    case ACTIONS.IS_COLLISION:
      // TODO: isCollision return Boolean not STATE.DEATH/ALIVE
      return {
        ...state,
        dino: { status: isCollision(action.payload) }
      }
    default:
      return state
  }
}

export default game
