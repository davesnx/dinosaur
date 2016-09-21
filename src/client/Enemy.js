import React from 'react'
import { Body, Sprite } from 'react-game-kit'

const Enemy = ({ body, sprite }) => {
  return (
    <Body
      ref={(node) => { }}
      {...body}
    >
      <Sprite
        repeat
        src='assets/megaman.png'
        scale={1}
        steps={[7]}
        style={{
          width: '64px',
          height: '144px'
        }}
        {...sprite}
      />
    </Body>
  )
}

export default Enemy
