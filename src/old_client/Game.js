import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { throttle } from 'lodash'
// import { Motion, spring } from 'react-motion'
import * as actions from 'actions'

import Dino from 'Dino'
import Background from 'Background'
import Distance from 'Distance'
import 'styles/main.scss'

import { DIRECTION, DINO_POSITION } from 'constants'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: DIRECTION.UP,
      position: DINO_POSITION.BOTTOM
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  _jump () {
    this.props.actions.jump()
  }

  _onKeyDown (keyEvent) {
    if (keyEvent.which === 32) {
      this._jump()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', ::this._onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', ::this._onKeyDown)
  }

  componentDidUpdate (prevProps, prevState) {
    // if (prevState.isJumping !== this.state.isJumping && this.state.isJumping === true) {
    //   setTimeout(() => {
    //     this.setState({ isJumping: false })
    //   }, JUMP_TIME)
    // }
  }

  render () {
    const { start, stop } = this.props.actions
    const { ticks, distance } = this.props
    return (
      <div className='c-overlay' onKeyDown={::this._onKeyDown}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <div className='o-render-area  u-mask'>
          <Distance points={distance}/>
          <Dino style={{transform: `translateY(-${this.state.position}px)`}} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
