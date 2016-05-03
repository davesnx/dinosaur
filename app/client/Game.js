import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import * as actions from 'actions'

import Dino from 'Dino'
import Background from 'Background'
import Distance from 'Distance'

import 'styles/main.scss'

const JUMP_TIME = 400

const isCollision = (firstElem, secondElem) => {
  const f = firstElem.getBoundingClientRect()
  const s = secondElem.getBoundingClientRect()
  return !(
    ((f.top + f.height) < (s.top)) || (f.top > (s.top + s.height)) ||
    ((f.left + f.width) < s.left) || (f.left > (s.left + s.width))
  )
}

class Game extends Component {
  constructor (props) {
    super(props)
    this._jump = throttle(this._jump, JUMP_TIME * 2)
    this.state = { isJumping: false }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  _bindKeyEvents (cb) {
    // window.addEventListener('keypress', cb)
  }

  _jump () {
    if (this.state.isJumping !== true) {
      this.setState({ isJumping: true })
    }
  }

  listenCollision (cb) {
    const dinoDOMNode = document.querySelector('.js-dino')
    return new Promise((resolve, reject) => {
      const collissionLoop = setInterval(() => {
        if (true) {
          let firsEnemyDOMNode = document.querySelectorAll('.c-enemy')[0]
          let c = isCollision(dinoDOMNode, firsEnemyDOMNode)
          console.log(`Dino and Enemy[0] collision: ${c}`)
          resolve(c)
        }
      }, 1000)
    })
  }

  componentDidMount () {
    this.listenCollision()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isJumping !== this.state.isJumping && this.state.isJumping === true) {
      setTimeout(() => {
        this.setState({ isJumping: false })
      }, JUMP_TIME)
    }
  }

  render () {
    const { start, stop } = this.props.actions
    const { ticks, distance } = this.props
    // ::this.bindKeyEvents(this._jump)

    return (
      <div className='c-overlay'>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button style={{float: 'right'}} onClick={::this._jump}>Jump</button>
        <div className='o-render-area  u-mask'>
          <Distance points={distance}/>
          <Dino refs='dino' isJumping={this.state.isJumping}/>
          <Background ticks={ticks} />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
