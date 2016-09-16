import React, { Component } from 'react'
import { render } from 'react-dom'
import Radium from 'radium'
import { Loop, Stage, World, Body } from 'react-game-kit'
import Konva from 'konva'

// import Background from './Background'
// import Distance from './Distance'
import Enemy from './Enemy'

const appStyles = {

}

@Radium
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'green'
    }

    this.ticks = [
      {
        lola: 1
      }, {
        lola: 1
      }, {
        lola: 1
      }, {
        lola: 1
      }
    ]

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
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

  handleClick () {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }

  render () {
    return (
      <div style={}>
        {/* <Distance points={23} /> */}
        <Loop>
          <Stage width={1024} height={576}>
            {/* <World> */}
              <Enemy />
            {/* </World> */}
          </Stage>
        </Loop>
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'))
