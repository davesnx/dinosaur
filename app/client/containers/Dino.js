import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions/actions'
import Background from 'components/Background'
import '../style/main.scss'

class Dino extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Background />
    )
  }
}

Dino.propTypes = {
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
