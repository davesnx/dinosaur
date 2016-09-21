import React, { Component } from 'react'
import { render } from 'react-dom'
import Radium from 'radium'
import { Loop, Stage, World } from 'react-game-kit'
import Matter from 'matter-js'

// import Background from './Background'
// import Distance from './Distance'
import Enemy from './Enemy'
import Dinosaur from './Dinosaur'

const appStyles = {
  height: '100%',
  width: '100%'
}

@Radium
class App extends Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.getWrapperStyles = this.getWrapperStyles.bind(this)
    this.physicsInit = this.physicsInit.bind(this)
  }

  handleKeyDown (event) {
    console.log(event.type, event.keyCode)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  physicsInit (engine) {
    console.log('engine', engine)
    const ground = Matter.Bodies.rectangle(
      512 * 3, 448,
      1024 * 3, 64,
      {
        isStatic: true
      }
    )

    Matter.World.addBody(engine.world, ground)
  }

  getWrapperStyles () {
    console.log('this.state', this.state)
    // const x = Math.round(this.state.x * this.context.scale)

    return {
      width: '1024px',
      height: '560px',
      transform: 'none'
    }
  }

  render () {
    return (
      <div style={appStyles}>
        {/* <Distance points={23} /> */}
        <Loop>
          <Stage
            style={this.getWrapperStyles()}>
            <World onInit={this.physicsInit}>
              <Enemy />
            </World>
          </Stage>
        </Loop>
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'))
