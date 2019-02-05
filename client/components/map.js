import { connect } from 'react-redux'
import React, { Component } from 'react'
import { makeMap } from './mapPresets'

class MapContainer extends Component {
  constructor () {
    super()
    this.loading = true
    this.map = {}
    this.initMap = this.initMap.bind(this)
  }

  initMap = bounds => {
    this.map = makeMap(bounds, this.props.position)
  }
  componentWillUnmount () {
    this.map = null
  }

  render () {
    return (
      <React.Fragment>
        {this.initMap(this.props.position.bounds)}
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    position: state.position
  }
}

export default connect(mapState)(MapContainer)
