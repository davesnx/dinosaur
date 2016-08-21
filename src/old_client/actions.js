import { ACTION } from 'constants'

export function start () {
  return {
    type: ACTION.START
  }
}

export function stop () {
  return {
    type: ACTION.STOP
  }
}

export function jump () {
  return {
    type: ACTION.JUMP
  }
}

export function move () {
  return {
    type: ACTION.MOVE,
    payload: {}
  }
}

// export function checkCollision ({ dino, firstEnemy }) {
//   return {
//     type: ACTION.IS_COLLISION,
//     payload: {
//       dino,
//       firstEnemy
//     }
//   }
// }
