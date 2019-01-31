import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import { me } from '../store/user'
import { setRadius, setCap } from '../store/posts'

class ChangeName extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      radius: 4,
      roomCap: 2
    }
  }
  componentDidMount () {
    this.setState({ displayName: this.props.user.username })
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
      this.props.setCap(this.state.roomCap)
      console.log('done')
    }
    this.props.history.push('/locating')
  }

  render () {
    if (!this.props.user.imgUrl) {
      this.props.history.push('/')
    }

    let { displayName } = this.state
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
                name='radius'
                className='input'
                type='number'
                min='1'
                max='10'
                value={this.state.radius}
                onChange={this.handleChange}
              />
              <p>Max Users</p>
              <input
                name='roomCap'
                className='input'
                type='number'
                min='1'
                max='10'
                value={this.state.roomCap}
                onChange={this.handleChange}
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
    setRadius: radius => dispatch(setRadius(radius)),
    setCap: cap => dispatch(setCap(cap))
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
