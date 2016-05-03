import React from 'react'
import PureRenderComponent from 'react-pure-render/component'
import { Motion, spring } from 'react-motion'

const DINO_BOTTOM_POSITION = 80
const DINO_JUMP_POSITION = 200

class Dino extends PureRenderComponent {
  render () {
    const position = this.props.isJumping ? DINO_JUMP_POSITION : DINO_BOTTOM_POSITION
    return (
      <Motion ref='dino' style={{ position: spring(position, [20, 200]) }}>
        {({ position }) => {
          return (<div className='c-dino  js-dino' style={{transform: `translateY(${-position}px)`}}/>)
        }}
      </Motion>
    )
  }
}

export default Dino
