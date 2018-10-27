import React, { Component, PropTypes } from 'react'
import fill from 'zero-fill'

class Distance extends Component {
  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number
  }

  render () {
    return (
      <div>
        <p>Score: {fill(5, this.props.points)}</p>
      </div>
    )
  }
}

export default Distance
