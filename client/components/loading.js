import React, { Component } from 'react'
import { getUserLocation, getGeoHash } from './utils'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'
import { setHash } from '../store/posts'

class Loading extends Component {
  constructor () {
    super()
    this.state = {
      latitude: 0,
      longitude: 0,
      geohash: '...'
    }
  }
  async componentDidMount () {
    if (typeof this.props.user.username !== 'string') {
      this.props.history.push('/')
    }
    // CHECKS USER LOCATION
    const coordinates = await getUserLocation()

    this.setState({
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    })
    const geohash = await getGeoHash(coordinates)
    console.log('loading', coordinates, this.props.user.email)
    const room = await this.props.firebase.findOrCreateRoom(
      geohash,
      this.props.user.email
    )

    this.setState({ geohash })
    const userObj = firebase
      .database()
      .ref()
      .child(`/rooms/${room}/users`)
    console.log(room)
    userObj.on('value', snap => {
      let users = []
      if (snap.val()) {
        users = Object.values(snap.val())
      }
      console.log(users, room)
      this.props.setHash(room)
      if (users.length >= 2) {
        this.props.history.push('/chat')
      }
    })
  }

  render () {
    // console.log(this.state)
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>Finding a room...</p>
          <button>X</button>
        </div>
        <div className='alert'>
          <img className='body' src='/searching.gif' />

          <div className='body'>
            <p className='title'>
              Lat:{this.state.latitude.toString().substring(0, 8)}
            </p>
            <br />
            <p className='title'>
              Lon: {this.state.longitude.toString().substring(0, 8)}
            </p>
            <br />
            <p className='title'>Geohash:{this.state.geohash}</p>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = dispatch => {
  return {
    setHash: hash => dispatch(setHash(hash))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const LoadingSetUpConnect = compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    mapDispatch
  )
)

export default LoadingSetUpConnect(Loading)

/**
 * PROP TYPES
 */
