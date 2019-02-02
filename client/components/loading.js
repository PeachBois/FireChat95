import React, { Component } from 'react'
import { getUserLocation, getGeoHash } from './utils'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'
import { setHash } from '../store/posts'
const dialUp = new Audio('dialUp.mp3')

export class Loading extends Component {
  constructor () {
    super()
    this.state = {
      latitude: 0,
      longitude: 0,
      geohash: '...',
      inRoom: false,
      room: '',
      failed: false
    }
    this.getRejectedIdiot = this.getRejectedIdiot.bind(this)
  }
  getRejectedIdiot = () => {
    this.setState({ failed: false })
  }

  async componentDidMount () {
    const sat = await this.props.firebase.room
    if (sat !== null) {
      await this.props.firebase.leaveRoom()
    }
    if (typeof this.props.user.username !== 'string') {
      dialUp.pause()
      this.props.history.push('/')
    } else {
      dialUp.play()
      const coordinates = await getUserLocation()
      if (coordinates !== 'failed') {
        this.setState({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude
        })
        const geohash = await getGeoHash(coordinates, this.props.radius)
        console.log('loading', coordinates, this.props.user.email)

        const room = await this.props.firebase.findOrCreateRoom(
          geohash,
          this.props.user.email,
          this.props.roomCap
        )

        this.setState({ geohash, room })
        const userObj = firebase
          .database()
          .ref()
          .child(`/rooms/${room}/users`)
        this.setState({ inRoom: true })

        userObj.on('value', snap => {
          let users = []
          if (snap.val()) {
            users = Object.values(snap.val())
          }
          console.log(users, room)
          this.props.setHash(room)
          if (users.length >= 2) {
            dialUp.pause()
            this.props.history.push('/chat')
          }
        })
      } else {
        this.setState({ failed: true })
      }
    }
  }
  shutDown = () => {
    this.setState({
      latitude: 0,
      longitude: 0,
      geohash: '...',
      inRoom: false,
      room: ''
    })
    firebase
      .database()
      .ref()
      .child(`/rooms/${this.state.room}`)
      .remove()
    dialUp.pause()
    this.props.history.push('/setup')
  }

  render () {
    return (
      <div className='box'>
        <div className='title'>
          {this.state.inRoom ? (
            <p className='title'>Waiting For Users...</p>
          ) : (
            <p className='title'>Finding Room...</p>
          )}
          <button onClick={this.shutDown}>X</button>
        </div>
        <div className='alert'>
          <img
            className='body'
            src={this.state.failed ? '/computer-offline.png' : '/searching.gif'}
          />

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
        <div className='body'>
          <h4 className='log'>
            {this.state.failed
              ? '>: Location services are being blocked! ಠ_ಠ'
              : '>: Here the server finds your approximate location and gives the server a hint as to find who is closeby, it may take a moment, so be patient!'}
          </h4>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    radius: state.posts.radius,
    roomCap: state.posts.roomCap
  }
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
