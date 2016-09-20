import React, { Component } from 'react'
import { Layer } from 'react-konva'
import Enemy from './Enemy'

class Background extends Component {
  render () {
    const { ticks } = this.props
    return (
      <Layer className='o-list-horitzontal  c-background'>
        {
          ticks.map((tick, index) => {
            if (tick.enemy) {
              return (<Enemy />)
            }
          })
        }
      </Layer>
    )
  }
}

export default Background
