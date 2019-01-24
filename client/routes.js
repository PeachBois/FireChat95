import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import MessageBox from './components/messageBox'
import { firebaseDb } from './firebase'
// import post from './store/posts'

const dbRefObject = firebaseDb.ref().child('Posts')
const postList = []
dbRefObject.on('value', snap => {
  postList.push(snap.val())
  console.log(postList)
})
class Routes extends Component {
  render () {
    return (
      <div>
        <MessageBox posts={postList} />
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
  )(Routes)
)

/**
 * PROP TYPES
 */
