import React from 'react'
import { Sprite } from 'react-game-kit'

const Enemy = () => {
  return (
    <Sprite
      repeat
      src='assets/megaman.png'
      state={0}
      steps={[9, 9, 0, 4, 5]}
    />
  )
}

export default Enemy
