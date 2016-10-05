import React from 'react'
import { Body, Sprite } from 'react-game-kit'

const Dinosaur = ({ body, sprite }) => {
  return (
    <Body
      {...body}
      ref={(node) => { console.log(node) }}
    >
      <Sprite
        repeat
        scale={1}
        steps={[7]}
        style={{
          width: '64px',
          height: '144px',
          background: 'red'
        }}
        {...sprite}
      />
    </Body>
  )
}

export default Dinosaur
