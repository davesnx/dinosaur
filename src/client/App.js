import React, { Component } from 'react'
import { render } from 'react-dom'
import { Layer, Rect, Stage } from 'react-konva'
import Konva from 'konva'

class MyRect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'green'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }

  render () {
    return (
      <Rect
        x={10}
        y={10}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={10}
        onClick={this.handleClick} />
      )
  }
}

function App () {
  // Stage - is a div wrapper
  // Layer - is a <canvas> element on the page
  // so you can use several canvases. It may help you to improve performance a lot.
  return (
    <Stage width={800} height={600}>
      <Layer>
        <MyRect/>
      </Layer>
    </Stage>
  )
}

render(<App/>, document.getElementById('root'))
