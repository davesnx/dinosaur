import React, { Component } from 'react'
import { TileMap } from 'react-game-kit'
import { autorun } from 'mobx'

// import GameStore from './stores/game-store';

class EnemyCollection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stageX: 0
    }
  }

  componentDidMount () {
    // this.cameraWatcher = autorun(() => {
    //   const targetX = Math.round(GameStore.stageX * this.context.scale)
    //   this.setState({
    //     stageX: targetX
    //   })
    // })
    setInterval(() => {
      this.setState({
        stageX: this.state.stageX + 2
      })
    }, 200)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    // const targetX = Math.round(GameStore.stageX * nextContext.scale)
    // this.setState({
    //   stageX: targetX
    // })
  }

  componentWillUnmount () {
    // this.cameraWatcher()
  }

  getWrapperStyles () {
    return {
      position: 'absolute',
      transform: `translate(${0}px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
      width: '800px',
      height: '600px',
      background: 'red'
    }
  }

  render () {
    return (
      <div style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: Math.floor(64 * this.state.stageX) }}
          src='assets/boardwalktile.png'
          tileSize={128}
          columns={24}
          rows={4}
          layers={[
            [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ]
          ]}
        />
      </div>
    )
  }
}

export default EnemyCollection
