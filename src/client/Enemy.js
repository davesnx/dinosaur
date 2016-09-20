import React from 'react'
import { Body, Sprite } from 'react-game-kit'

const Enemy = ({ body, sprite }) => {
  return (
    <Body
      ref={(node) => { console.log('node', node) }}
      args={[20, 50, 100]}
      inertia={Infinity}
      {...body}
    >
      <Sprite
        repeat
        src='assets/megaman.png'
        ticksPerFrame={1}
        scale={1}
        steps={[9, 9, 0, 4, 5]}
        {...sprite}
      />
    </Body>
  )
}

export default Enemy
