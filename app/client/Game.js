import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import * as actions from 'actions'

import Dino from 'Dino'
import Background from 'Background'
import Distance from 'Distance'

import { Motion, spring } from 'react-motion'

const DINO_BOTTOM_POSITION = 80
const DINO_JUMP_POSITION = 200

// import keydown from 'react-keydown'

import 'styles/main.scss'

const JUMP_TIME = 400

class Game extends Component {
  constructor (props) {
    super(props)
    this._jump = throttle(this._jump, JUMP_TIME * 2)
    this.state = { isJumping: false }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  _jump () {
    if (this.state.isJumping !== true) {
      this.setState({ isJumping: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isJumping !== this.state.isJumping && this.state.isJumping === true) {
      setTimeout(() => {
        this.setState({ isJumping: false })
      }, JUMP_TIME)
    }
  }

  lola (event) {
    if (event) console.log('lola?', event)
  }

  render () {
    const { start, stop } = this.props.actions
    const { ticks, distance } = this.props
    const position = this.state.isJumping ? DINO_JUMP_POSITION : DINO_BOTTOM_POSITION

    return (
      <div className='c-overlay' onKeyDown={::this.lola}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <div className='o-render-area  u-mask'>
          <Distance points={distance}/>
          <Motion style={{ position: spring(position, [20, 200]) }}>
            {({ position }) => {
              return (<Dino style={{transform: `translateY(${-position}px)`}} />)
            }}
          </Motion>
          <Background ticks={ticks} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
