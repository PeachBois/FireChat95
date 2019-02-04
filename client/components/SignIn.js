import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from 'firebase'
import { me } from '../store/user'
// Configure Firebase.

class SignInScreenBase extends Component {
  state = {
    isSignedIn: false,
    user: null
  }

  uiConfig = {
    signInFlow:
      'matchMedia' in window &&
      window.matchMedia('(display-mode: standalone)').matches
        ? 'popup'
        : 'redirect',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: async () => {}
    }
  }
  AnonLog = () => {
    const newUser = {
      username: 'Anonymous User',
      imgUrl: 'computer-'+Math.floor(Math.random() * (0 - 4) ) +'.png',
      email: 'anon@fakeassemail.com'
    }

    this.props.me(newUser)
    this.props.history.push('/setup')
  }
  async componentDidMount () {
    this.unregisterAuthObserver = await firebase
      .auth()
      .onAuthStateChanged(async user => {
        this.setState({ isSignedIn: !!user })
        if (firebase.auth().currentUser !== null) {
          const { displayName, photoURL, email } = await firebase.auth()
            .currentUser
          const newUser = {
            username: displayName,
            imgUrl: photoURL,
            email
          }
console.log(newUser)
          this.props.me(newUser)
          if (this.props.user.username !== undefined) {
            this.props.history.push('/setup')
          }
        }
      })
  }
  componentWillUnmount () {
    this.unregisterAuthObserver()
  }
  render () {
    if (!this.state.isSignedIn) {
      return (
        <div>
          {'matchMedia' in window &&
          window.matchMedia('(display-mode: standalone)').matches ? (
            <button onClick={this.AnonLog}><h3>Anonymous Login</h3></button>
            ) : (
              ''
            )}
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )
    }
    return (
      <div>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
      </div>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}
const mapDispatch = dispatch => {
  return {
    me: user => dispatch(me(user))
  }
}
const SignInScreen = compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    mapDispatch
  )
)

export default SignInScreen(SignInScreenBase)
