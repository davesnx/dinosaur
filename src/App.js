import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react'

// import { tween } from 'popmotion'

const width = 500
const height = 500
const scale = window.devicePixelRatio

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

const App = () => {
  const square = {
    size: { x: 10, y: 10 },
    position: { x: 0, y: 200 }
  }

  const velocityX = 1
  const velocityY = 0

  const ref = useRef(null)
  const [color, setColor] = useState('black')

  const canvas = ref.current && ref.current.getContext('2d')

  useEffect(() => {
    if (!canvas) {
      return
    }

    gameLoop(() => {
      canvas.clearRect(0, 0, ref.width, ref.height)

      square.position.x += velocityX
      square.position.y += velocityY

      // if the block leaves the canvas on the right side
      // bring it back to the left side
      if (square.position.x > 500) {
        square.position.x = 0
      }

      canvas.fillRect(
        square.position.x,
        square.position.y,
        square.size.x,
        square.size.y
      )

      // squareRect.fillStyle = color
    })
  })

  return (
    <Fragment>
      <canvas
        ref={ref}
        style={{ display: 'block', width, height }}
        width={width * scale}
        height={height * scale}
      />
      <br />
      <button type='button' onClick={() => setColor('black')}>
        Start
      </button>
    </Fragment>
  )
}

export default App
