import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

import Game from 'Game'
import game from 'reducers'
import sagas from 'sagas'

const logger = createLogger({ collapsed: true })
const sagaMiddleware = createSagaMiddleware()

const storeFactory = compose(
  applyMiddleware(
    logger,
    sagaMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('reducers', () => {
    const nextReducer = require('reducers').default
    store.replaceReducer(nextReducer)
  })
}

const store = storeFactory(game)

sagaMiddleware.run(sagas)

render(
  <Game />,
  document.getElementById('root')
)
