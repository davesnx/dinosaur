import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Layer, Rect, Stage, Group } from 'react-konva'
// import { StyleSheet, css } from 'aphrodite'
import 'styles/main.scss'

class MyRect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'green'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      color: 'red'
    })
  }

  render () {
    return (
      <Rect
        x={10}
        y={10}
        width={50}
        height={50}
        fill={this.state.color}
        onClick={this.handleClick} />
    )
  }
}

const Game = () => (
  <Stage width={700} height={700} className='c-game'>
    <Layer>
      <MyRect/>
    </Layer>
  </Stage>
)

// import { Provider } from 'react-redux'
// import { createStore, compose, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import createLogger from 'redux-logger'

// import Game from 'Game'
// import game from 'reducers'
// import sagas from 'sagas'

// const logger = createLogger({ collapsed: true })
// const sagaMiddleware = createSagaMiddleware()
//
// const storeFactory = compose(
//   applyMiddleware(
//     logger,
//     sagaMiddleware
//   ),
//   window.devToolsExtension ? window.devToolsExtension() : (f) => f
// )(createStore)
//
// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept('reducers', () => {
//     const nextReducer = require('reducers').default
//     store.replaceReducer(nextReducer)
//   })
// }
//
// const store = storeFactory(game)
//
// sagaMiddleware.run(sagas)

render(
  <Game />,
  document.getElementById('root')
)
