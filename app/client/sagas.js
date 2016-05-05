import { delay } from 'redux-saga'
import { put, call, cancel, take, fork, race } from 'redux-saga/effects'
import { START, STOP, MOVE, IS_COLLISION } from 'constants'

const ONE_SEC = 1000

function * movement () {
  while (true) {
    yield call(delay, ONE_SEC) // ONE_SEC / 12
    yield put({ type: MOVE })
    yield take(IS_COLLISION)
  }
}

function * gameLoop () {
  while (true) {
    yield take(START)
    const moving = yield fork(movement)
    yield race([
      yield take(STOP),
      yield take(IS_COLLISION)
    ])
    yield cancel(moving)
  }
}

export default function * sagas () {
  yield [
    fork(gameLoop)
  ]
}
