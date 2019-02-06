import React, { Component } from 'react'
import { getGeoHash } from './utils'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'
import { setHash } from '../store/posts'
import { getTip } from './tips'
const dialUp = new Audio('dialUp.mp3')
const error = new Audio('error.mp3')

export class Loading extends Component {
  constructor () {
    super()
    this.state = {
      latitude: 0,
      longitude: 0,
      geohash: '...',
      inRoom: false,
      room: '',
      failed: false,
      tip: ''
    }
    this.getRejectedIdiot = this.getRejectedIdiot.bind(this)
  }
  getRejectedIdiot = () => {
    this.setState({ failed: false })
  }

  async componentDidMount () {
    if (typeof this.props.user.username !== 'string') {
      dialUp.pause()
      this.props.history.push('/')
    } else {
      dialUp.play()
      const coordinates = this.props.location

      if (coordinates.lat !== undefined) {
        this.setState({
          latitude: coordinates.lat,
          longitude: coordinates.lng
        })

        const geohash = await getGeoHash(coordinates, this.props.radius)

        const room = await this.props.firebase.findOrCreateRoom(
          geohash,
          this.props.roomCap,
          this.props.user.imgUrl,
          this.props.user.username
        )

        this.setState({ geohash, room, tip: getTip() })
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
          this.props.setHash(room)
          if (users.length >= 2) {
            dialUp.pause()
            this.props.history.push('/chat')
            if (users.length < 2) {
              dialUp.pause()
              this.props.history.push('/setup')
            }
          }
        })
      } else {
        this.setState({ failed: true })
        dialUp.pause()
        error.play()
      }
    }
  }
  shutDown = () => {
    this.setState({
      latitude: 0,
      longitude: 0,
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
          <div className='help'>
            <img
              src='computer.png'
              className='buttonPic'
              onClick={() => {
                this.setState({ tip: getTip() })
              }}
            />

            <h4 className='log'>
              {this.state.failed
                ? '>: Location services are being blocked! ಠ_ಠ'
                : this.state.tip}
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    radius: state.posts.radius,
    roomCap: state.posts.roomCap,
    location: state.position
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
