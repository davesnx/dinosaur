import React from 'react'
import PureRenderComponent from 'react-pure-render/component'
import className from 'classnames'
import Enemy from 'Enemy'

class Background extends PureRenderComponent {
  renderBackground (t, i) {
    const classes = className('c-tick', { 'have-enemy': t.haveEnemy === true })
    const enemy = t.haveEnemy ? (<Enemy className='js-enemy' type={t.type} />) : null
    return (
      <div key={i} className={classes}>
        {enemy}
        <hr className='c-floor'/>
      </div>
    )
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
