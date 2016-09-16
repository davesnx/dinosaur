import React from 'react'
import fill from 'zero-fill'

const Distance = ({ points }) => {
  return (
    <div className='c-distance'>
      <p>Score: {fill(5, points)}</p>
    </div>
  )
}

export default Distance
