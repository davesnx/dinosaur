import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions/actions'

class Dino extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <section className='main'>
        <h1>Dino world!</h1>
      </section>
    )
  }
}

Dino.propTypes = {
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    state: state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dino)
