import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import * as actions from 'actions'

import Dino from 'Dino'
import Background from 'Background'
import Distance from 'Distance'

import 'styles/main.scss'

const JUMP_TIME = 300

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
      <div className='o-render-area  u-mask'>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button style={{float: 'right'}} onClick={::this._jump}>Jump</button>
        <Distance points={distance}/>
        <Dino isJumping={this.state.isJumping}/>
        <Background ticks={ticks} />
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
