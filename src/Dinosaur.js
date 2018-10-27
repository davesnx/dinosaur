import React, { Component, PropTypes } from 'react'

class Dinosaur extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{
        zIndex: 1,
        width: '60px',
        height: '130px',
        background: 'red',
        transform: `translate(${this.props.x}px, ${this.props.y}px)`
      }} />
    )
  }
}

export default Dinosaur
