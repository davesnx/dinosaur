import React from 'react'
import PureRenderComponent from 'react-pure-render/component'

class Background extends PureRenderComponent {
  constructor (props) {
    super(props)

    this.props = {
      velocity: 100,
      moving: false
    }
  }

  render () {
    return (
      <div className='mask'>
        <div className='movement'></div>
      </div>
    )
  }
}

export default Background
