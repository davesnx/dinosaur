import { delay } from 'redux-saga'
import { put, call, cancel, take, fork, race } from 'redux-saga/effects'
import { ACTION } from 'constants'

const ONE_SEC = 1000

function * movement () {
  while (true) {
    yield call(delay, ONE_SEC / 2) // ONE_SEC / 12
    yield put({ type: ACTION.MOVE })
    // yield take(IS_COLLISION)
  }
}

function * gameLoop () {
  while (true) {
    yield take(ACTION.START)
    const moving = yield fork(movement)
    yield take(ACTION.STOP)
    yield cancel(moving)
  }
}

export default function * sagas () {
  yield [
    fork(gameLoop)
  ]
}
