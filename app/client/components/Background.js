import React, { PropTypes } from 'react'
import classNames from 'classNames'
import PureRenderComponent from 'react-pure-render/component'

class Background extends PureRenderComponent {
  constructor (props) {
    super(props)

    this.props = {
      velocity: 100,
      moving: false
    }
  }

  componentDidUpdate () {
    console.log('block')
  }

  render () {
    return (<div>dino!</div>)
  }
}

export default Background
