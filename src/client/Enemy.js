import React from 'react'
import { Sprite } from 'react-game-kit'

const Enemy = ({ position, size }) => {
  return (
    <Sprite
      repeat
      scale={1}
      steps={[0]}
      style={{
        zIndex: 1,
        top: `${position}px`,
        width: '24px',
        height: '135px',
        background: 'black'
      }}
    />
  )
}

export default Enemy
