import { put, call, take, select, fork } from 'redux-saga/effects'
import { START, STARTED, STOP, STOPED, MOVE } from 'constants'

const ONE_SEC = 1000

const delay = (time) => (
  new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
)

function * standBy (getState) {
  if (yield take(START)) {
    while (true && getState().status === STARTED) {
      yield call(delay, ONE_SEC) // ONE_SEC / 10
      yield put({ type: MOVE })
    }
  }
}

function* gameSaga(getState) {
  while (true) {
    yield take(PLAY);
    yield put(reset());
    const running = yield fork(gameLoop, getState);
    yield take(GAME_OVER);
    yield cancel(running);
  }
}

export default function * sagas (getState) {
  yield [
    fork(standBy.bind(getState, getState))
  ]
}
