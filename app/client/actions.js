import { ACTIONS } from 'constants'

export function start () {
  return {
    type: ACTIONS.START
  }
}

export function stop () {
  return {
    type: ACTIONS.STOP
  }
}

export function jump () {
  return {
    type: ACTIONS.JUMP
  }
}

export function move () {
  return {
    type: ACTIONS.MOVE,
    payload: {}
  }
}

export function checkCollision ({ dino, firstEnemy }) {
  return {
    type: ACTIONS.IS_COLLISION,
    payload: {
      dino,
      firstEnemy
    }
  }
}
