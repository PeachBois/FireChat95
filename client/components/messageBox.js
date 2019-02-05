import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import { getGif } from './utils'
import firebase from 'firebase'
const inbound = new Audio('jig0.wav')

class messageBox extends Component {
  constructor () {
    super()
    this.state = {
      body: '',
      postList: [],
      dbRefObject: false,
      username: '',
      users: [],
      imgId: ''
    }
  }
  shutDown = async () => {
    await this.props.firebase.writeNewPost(
      'Winnie',
      './computer.png',
      `${this.props.user.username} has left the room. (╯°□°）╯ `
    )
    if (this.state.imgId) {
      this.props.firebase.leaveRoom(this.state.imgId)
      this.props.history.push('/setup')
    }
  }
  async componentDidMount () {
    const hash = this.props.hash
    if (typeof hash !== 'string') {
      this.props.history.push('/')
    }

    let postList = []
    let dbRefObject
    let usersDb
    if (hash) {
      dbRefObject = firebase
        .database()
        .ref()
        .child(`/rooms/${hash}/posts`)
      usersDb = firebase
        .database()
        .ref()
        .child(`/rooms/${hash}/users`)
    }
    if (this.props.user.username) {
      usersDb.on('value', snap => {
        let users = []
        if (snap.exists()) {
          const userObject = snap.val()
          if (userObject) {
            let i = 0
            let keys = Object.keys(userObject)
            Object.values(userObject).forEach(element => {
              if (element.username === this.props.user.username) {
                this.setState({ imgId: keys[i] })
                console.log(this.state.imgId)
              }
              users.push({ key: Object.keys(element), img: element.img })
              i++
            })
            this.setState({ users })
          }
        } else {
          this.props.history.push('/setup')
        }
      })
    }

    dbRefObject.on('value', snap => {
      postList = []
      const postObj = snap.val()
      let key

      if (postObj) {
        Object.keys(postObj)

        for (key in postObj) {
          postList.push(postObj[key])
        }
        inbound.play()
        this.setState({ postList })
      }
    })
    this.setState({ dbRefObject })
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }
  componentWillUnmount () {
    const dbRefObject = firebase
      .database()
      .ref()
      .child(`/rooms/${hash}/posts`)
    const usersDb = firebase
      .database()
      .ref()
      .child(`/rooms/${hash}/users`)
    usersDb.off()
    dbRefObject.off()
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = async evt => {
    evt.preventDefault()

    if (this.state.body !== '') {
      const { username, imgUrl } = this.props.user
      const body = this.state.body
      this.props.firebase.writeNewPost(username, imgUrl, body)
      this.setState({ body: '' })
    }
  }

  hashCode = str => {
    // java String#hashCode
    var hash = 0
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  intToRGB = i => {
    var c = (i & 0x00ffffff).toString(16).toUpperCase()

    return '#' + '00000'.substring(0, 6 - c.length) + c
  }

  scrollToBottom = () => {
    this.messageEnd.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  render () {
    let { body } = this.state

    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button onClick={this.shutDown}>X</button>
        </div>
        <div className='body'>
          <p className='title'>Welcome!</p>
          <div className='userBar'>
            {this.state.users.map(user => {
              return (
                <img
                  key={this.hashCode(user.img)}
                  className='userBarIcon'
                  src={user.img}
                />
              )
            })}
          </div>
          <div className='inner'>
            {this.state.postList.map(entry => {
              return (
                <div
                  className='message'
                  key={this.hashCode(entry.body + Math.random())}
                >
                  <img src={entry.img} className='chatImg' />
                  <p
                    style={{
                      color: this.intToRGB(this.hashCode(entry.username))
                    }}
                  >
                    {entry.username}
                  </p>
                  {entry.body.img ? (
                    <img src={entry.body.img} className='gif' />
                  ) : (
                    <p>{entry.body}</p>
                  )}{' '}
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
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              value={body}
              name='body'
              autoComplete='off'
              onChange={this.handleChange}
            />
            <button type='submit'>Submit</button>
          </form>
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
