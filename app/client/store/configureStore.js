import { createStore } from 'redux'
import gameReducer from 'reducers/reducers'

export default function configureStore (initialState) {
  const store = createStore(gameReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/reducers', () => {
      const nextReducer = require('reducers/reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
