import React from 'react'
import PureRenderComponent from 'react-pure-render/component'
import className from 'classnames'

class Background extends PureRenderComponent {
  renderBackground (t, i) {
    const classes = className('c-tick', { 'have-enemy': t.haveEnemy === true })
    return (<div key={i} className={classes} />)
  }

  renderBackgroundList (ticks) {
    return ticks.map((t, i) => this.renderBackground(t, i))
  }

  render () {
    return (
      <div className='o-list-horitzontal  c-background'>
        {::this.renderBackgroundList(this.props.ticks.all)}
      </div>
    )
  }
}

export default Background
