import React, { Fragment, useRef, useLayoutEffect } from 'react'

let requestAnimationFrame =
  global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame ||
  function (callback) {
    global.setTimeout(callback, 1000 / 60)
  }

const gameLoop = handle => {
  handle()
  requestAnimationFrame(() => {
    gameLoop(handle)
  })
}

const App = ({ width, height, scale }) => {
  const square = {
    size: { x: 10, y: 10 },
    position: { x: 0, y: 200 }
  }

  const velocityX = 1
  const velocityY = 0

  const canvas = useRef(null)

  useLayoutEffect(() => {
    if (!canvas) {
      return
    }

    const context = canvas.current.getContext('2d')

    gameLoop(() => {
      context.clearRect(0, 0, context.width, context.height)

      square.position.x += velocityX
      square.position.y += velocityY

      // if the block leaves the canvas on the right side
      // bring it back to the left side
      if (square.position.x > width) {
        square.position.x = 0
      }

      context.fillRect(
        square.position.x,
        square.position.y,
        square.size.x,
        square.size.y
      )
    })
  })

  return (
    <Fragment>
      <canvas
        ref={canvas}
        style={{ display: 'block', width, height }}
        width={width * scale}
        height={height * scale}
      />
    </Fragment>
  )
}

export default App
