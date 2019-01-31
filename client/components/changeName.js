import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'
import { me } from '../store/user'
import {loadLocation, setZoom} from '../store/map'
import SignInGoogle from './SignInGoogle'
import { setRadius } from '../store/posts'

class ChangeName extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      radius: 4
    }
  }
  componentDidMount () {
    this.setState({ displayName: this.props.user.username })
    this.props.loadLocation()//unnecessary?
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    if (this.state.displayName !== '') {
      this.props.me({
        username: this.state.displayName,
        roles: this.props.user.rules,
        imgUrl: this.props.user.imgUrl,
        email: this.props.user.email
      })
      this.props.setRadius(this.state.radius)
    }
    this.props.history.push('/locating')
  }
  searchArea = evt => {
    //other functions can go here
    console.log(typeof +evt.target.value)
    this.props.setZoom(+evt.target.value)
  }
  render () {
    if (!this.props.user.imgUrl) {
      this.props.history.push('/')
    }

    let { displayName, radius } = this.state
    const { imgUrl } = this.props.user
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button>X</button>
        </div>
        <div className='body'>
          <div className='userSpace'>
            <img src={imgUrl} className='userImg' />

            <div className='changeName'>
              <p>Set A Display Name</p>
              <input
                type='text'
                value={displayName}
                name='displayName'
                onChange={this.handleChange}
              />
              <p>Search Accuracy</p>
              <input
<<<<<<< HEAD
                type='range'
                min='14'
                max='22'
                defaultValue='18'
                className='slider'
                id='myRange'
                onChange={this.searchArea}
                
=======
                name='radius'
                className='input'
                type='number'
                min='1'
                max='10'
                defaultValue='4'
                onChange={this.handleChange}
>>>>>>> d4db6ca6bcce0a32b4ef087589fde92a8bc744e8
              />
            </div>
          </div>

          <button type='submit' onClick={this.handleSubmit}>
            Login
          </button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return { user: state.user }
}

const mapDispatch = dispatch => {
  return {
    me: name => dispatch(me(name)),
<<<<<<< HEAD
    loadLocation: () => dispatch(loadLocation()),
    setZoom: value => dispatch(setZoom(value))
=======
    setRadius: radius => dispatch(setRadius(radius))
>>>>>>> d4db6ca6bcce0a32b4ef087589fde92a8bc744e8
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    mapDispatch
  )
)

export default MessageBoxConnect(ChangeName)

/**
 * PROP TYPES
 */
