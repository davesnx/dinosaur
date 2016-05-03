import { delay } from 'redux-saga'
import { put, call, cancel, take, select, fork } from 'redux-saga/effects'
import { START, STARTED, STOP, STOPED, MOVE } from 'constants'

const ONE_SEC = 1000

function * movement () {
  while (true) {
    yield call(delay, ONE_SEC / 12)
    yield put({ type: MOVE })
  }
}

function * gameLoop () {
  while (true) {
    yield take(START)
    const moving = yield fork(movement)
    yield take(STOP)
    yield cancel(moving)
  }
}

export default function * sagas () {
  yield [
    fork(gameLoop)
  ]
}
