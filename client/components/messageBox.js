import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
class messageBox extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      body: ''
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = evt => {
    console.log(this.props)
    this.props.firebase.writeNewPost(this.state.username, this.state.body)
  }

  render () {
    let { body, username } = this.state
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button>X</button>
        </div>
        <div className='body'>
          <p className='title'>Welcome!</p>
          <div className='inner'>
            {/* {this.props.posts.map(entry => {
              return (
                <div id='1'>
                  <p>{entry}</p>
                </div>
              )
            })} */}
          </div>
          <input
            type='text'
            value={username}
            name='username'
            onChange={this.handleChange}
          />
          <input
            type='text'
            value={body}
            name='body'
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
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

export default MessageBoxConnect(messageBox)

/**
 * PROP TYPES
 */
