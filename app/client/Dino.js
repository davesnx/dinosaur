import React from 'react'
import PureRenderComponent from 'react-pure-render/component'
import { Motion, spring } from 'react-motion'

const DINO_BOTTOM_POSITION = 80

class Dino extends PureRenderComponent {
  render () {
    const position = this.props.isJumping ? 200 : DINO_BOTTOM_POSITION
    return (
      <Motion ref='dino' style={{ position: spring(position, [20, 20]) }}>
        {({ position }) => {
          return (<div className='c-dino' style={{transform: `translateY(${-position}px)`}}/>)
        }}
      </Motion>
    )
  }
}

export default Dino
