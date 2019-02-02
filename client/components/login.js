import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { withRouter, Route, Switch } from 'react-router-dom'
// import { withFirebase } from '../Firebase/index'
// import { compose } from 'recompose'
// import firebase from 'firebase'
// import { me } from '../store/user'
import SignInGoogle from './SignInGoogle'

const Login = () => {
  console.log('are you in login???')
  return (
    <div className='box'>
      <div className='title'>
        <p className='title'>ALOL</p>
        <button>X</button>
      </div>
      <div>
        <div className='login'>
          <img src='computer.png' className='mascot' />
          <SignInGoogle />
        </div>
        <div className='body'>
          <h4 className='log'>
            >: Hello! My Name is Winny! Let me know a little about you!
          </h4>
        </div>
      </div>
    </div>
  )
}

// const mapState = state => {
//   return {}
// }

// const mapDispatch = dispatch => {
//   return {
//     me: name => dispatch(me(name))
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// const MessageBoxConnect = compose(
//   withRouter,
//   withFirebase,
//   connect(
//     mapState,
//     mapDispatch
//   )
// )

export default Login

/**
 * PROP TYPES
 */
