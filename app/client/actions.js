import { START, STOP, JUMP, MOVE } from 'constants'

export function start () {
  return {
    type: START
  }
}

export function stop () {
  return {
    type: STOP
  }
}

export function jump () {
  return {
    type: JUMP
  }
}

export function move () {
  return {
    type: MOVE,
    payload: {}
  }
}
