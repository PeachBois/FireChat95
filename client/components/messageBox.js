import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { firebaseDb } from '../firebase'

class messageBox extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      body: ''
    }
  }

  writeNewPost = () => {
    // A post entry.
    let postData = {
      username: this.state.username,
      body: this.state.body
    }
    console.log(postData)

    let newPostKey = firebaseDb
      .ref()
      .child('posts')
      .push().key
    console.log(newPostKey)
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/posts/' + newPostKey] = postData
    console.log(updates)
    return firebaseDb.ref().update(updates)
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
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
          <button onClick={this.writeNewPost}>Submit</button>
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
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(messageBox)
)

/**
 * PROP TYPES
 */
