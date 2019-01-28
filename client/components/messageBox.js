import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'

class messageBox extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      body: '',
      postList: []
    }
  }
  componentDidMount () {
    if (typeof this.props.user.username !== 'string') {
      this.props.history.push('/')
    }
    let postList = []

    const dbRefObject = firebase
      .database()
      .ref()
      .child('posts')

    dbRefObject.on('value', snap => {
      postList = []
      const postObj = snap.val()
      let key = Object.keys(postObj)
      for (key in postObj) {
        postList.push(postObj[key])
      }
      this.setState({ postList, username: this.props.user.username })
    })

    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = evt => {
    this.props.firebase.writeNewPost(this.props.user.username, this.state.body)
    this.setState({ body: '' })
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  scrollToBottom = () => {
    console.log('messageEnd!!! ==> ', this.messageEnd)
    this.messageEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    let { body } = this.state
    let hStyle = { color: this.getRandomColor() }
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button>X</button>
        </div>
        <div className='body'>
          <p className='title'>Welcome!</p>
          <div className='inner'>
            {this.state.postList.map(entry => {
              return (
                <div id={entry.body + Math.random()}>
                  <p style={this.state.style}>{entry.username}</p>
                  <p>:{entry.body}</p>
                </div>
              )
            })}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messageEnd = el
              }}
            />
          </div>
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
  return { user: state.user }
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
