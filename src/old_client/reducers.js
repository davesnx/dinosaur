import { ACTION, STATE, DIRECTION, DINO_POSITION } from 'constants'
import _ from 'lodash'
// import {freeze} from 'freezr'

const N_TICKS = 100

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

const getSubsetTicks = (arr, start, end) => {
  let temp = []
  for (let i = start; i < end; i++) {
    temp = arr[i]
  }
  return temp
}

const INITIAL_STATE = {
  distance: 0,
  game: {
    status: STATE.STOPED
  },
  dino: {
    status: STATE.ALIVE,
    isJumping: false,
    direction: DIRECTION.UP,
    position: DINO_POSITION.BOTTOM
  },
  ticks: {
    all: generateTicks(N_TICKS),
    subset: [] // For create a pagination number of ticks!
  }
}

const isCollision = (f, s) => {
  console.log('checkCollision', f, s)
  return false
  // return !(
  //   ((f.top + f.height) < (s.top)) || (f.top > (s.top + s.height)) ||
  //   ((f.left + f.width) < s.left) || (f.left > (s.left + s.width))
  // )
}

// _isDinoBelowTop () {
//   return this.state.position < DINO_POSITION.TOP
// }
//
// _isDinoAboveBottom () {
//   return this.state.position > DINO_POSITION.BOTTOM
// }
//
// _isDinoOnTop () {
//   return this.state.position === DINO_POSITION.TOP
// }
//
// _isDinoOnBottom () {
//   return this.state.position === DINO_POSITION.BOTTOM
// }
//
// _isDinoDirection (direc) {
//   return this.state.direction === direc
// }

function game (state = INITIAL_STATE, action) {
  switch (action.type) {

    case ACTION.START:
      return {
        ...state,
        game: {
          status: STATE.STARTED
        }
      }

    case ACTION.STOP:
      return {
        ...state,
        game: {
          status: STATE.STOPED
        }
      }

    case ACTION.JUMP:
      return {
        ...state,
        dino: {
          ...state.dino,
          isJumping: true
        }
      }

    case ACTION.MOVE:
      return {
        ...state,
        dino: {
          ...state.dino,
          status: isCollision(state.position) ? STATE.DEATH : STATE.ALIVE
        },
        distance: N_TICKS - state.ticks.all.length,
        ticks: {
          all: [...state.ticks.all.splice(1)],
          subset: getSubsetTicks(...state.ticks.all, state.distance, state.distance + N_TICKS)
        }
      }

    default:
      return state
  }
}

export default game
