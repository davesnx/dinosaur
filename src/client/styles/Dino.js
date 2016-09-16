import React from 'react'
import { Rect } from 'react-konva'

const Dino = ({ style }) => {
  return (
    <Rect
      x={10}
      y={10}
      width={150}
      height={450}
      fill={this.state.color}
      onClick={this.handleClick}
    />
  )
}

export default Dino
