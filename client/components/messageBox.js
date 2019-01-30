import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import firebase from 'firebase'

class messageBox extends Component {
  constructor () {
    super()
    this.state = {
      body: '',
      postList: []
    }
  }
  async componentDidMount () {
    const { username } = this.props.user
    const hash = this.props.hash
    if (typeof username !== 'string') {
      this.props.history.push('/')
    }
    let postList = []
    console.log(hash)
    const dbRefObject = firebase
      .database()
      .ref()
      .child(`/rooms/${hash}/posts`)

    dbRefObject.on('value', snap => {
      postList = []
      const postObj = snap.val()
      let key
      if (postObj) {
        Object.keys(postObj)

        for (key in postObj) {
          postList.push(postObj[key])
        }
        this.setState({ postList })
      }
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
    const hash = this.props.hash
    const body = this.state.body
    this.props.firebase.writeNewPost(this.props.user.username, body, hash)
    this.setState({ body: '' })
  }

  getRandomColor = name => {
    let arr = name.split('').sort()
    const letters = '0123456789ABCDEF'
    let result = []
    for (let i = 0; i < arr.length; i++) {
      if (!letters.includes(arr[i])) {
        if (letters[i]) {
          result.push(letters[i])
        } else {
          result.push(letters[5])
        }
      } else {
        result.push(name[i])
      }
    }

    const checkLength = arr => {
      let newArr = []

      if (arr.length >= 6) {
        newArr = arr.slice(0, 6)
      } else {
        newArr = [...arr, ...arr]
        checkLength(newArr)
      }
      return newArr
    }
    result = checkLength(result).join('')
    console.log(result)
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += result
    }
    return color
  }

  scrollToBottom = () => {
    this.messageEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    let { body } = this.state

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
                  <p style={{ color: this.getRandomColor(entry.username) }}>
                    {entry.username}
                  </p>
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
  return { user: state.user, hash: state.posts.hash }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(mapState)
)

export default MessageBoxConnect(messageBox)

/**
 * PROP TYPES
 */
