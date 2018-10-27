import React, { Component } from 'react'
// import { TileMap } from 'react-game-kit'
// import { autorun } from 'mobx'

// import GameStore from './stores/game-store';

import Enemy from './Enemy'

class EnemyCollection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stageX: 0
    }
  }

  getWrapperStyles () {
    return {
      zIndex: 0,
      position: 'absolute',
      transform: `translate(${this.state.stageX}px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
      width: '100%',
      height: '300px',
      background: 'yellow'
    }
  }

  render () {
    return this.props.enemies.map((k, index) => <Enemy key={index}/>)
  }
}

export default EnemyCollection
