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
    user: null,
    os: null
  }

  uiConfig = {
    signInFlow: 'redirect',
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
      imgUrl: 'computer-' + Math.floor(Math.random() * (4 - 0)) + '.png',
      email: 'anon@fakeassemail.com'
    }
    console.log(newUser)

    this.props.me(newUser)
    this.props.history.push('/setup')
  }
  async componentDidMount () {
    this.setState({ os: this.getOs() })
   
    this.unregisterAuthObserver = await firebase
      .auth()
      .onAuthStateChanged(async user => {
        this.setState({ isSignedIn: !!user })
        if (firebase.auth().currentUser !== null) {
          console.log(firebase.auth().currentUser)
          const { displayName, photoURL, email } = await firebase.auth()
            .currentUser
          const newUser = {
            username: displayName,
            imgUrl: photoURL,
            email
          }
        
          firebase.database().ref().child('/users').update( {uid:firebase.auth().currentUser.providerData[0].uid})
        
          this.props.me(newUser)
          if (this.props.user.username !== undefined) {
            this.props.history.push('/setup')
          }
        }
      })
  }
  getOs = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
      return 'Android'
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }

    return 'unknown'
  }
  // componentWillUnmount () {
  //   this.unregisterAuthObserver()
  // }
  render () {
    if (!this.state.isSignedIn) {
      return (
        <div className='logBox'>
          <button onClick={this.AnonLog} className='anon'>
            <div>
              <p>Anonymous Login</p>
            </div>
          </button>
          {'matchMedia' in window &&
          window.matchMedia('(display-mode: standalone)').matches &&
          this.state.os === 'iOS' ? (
            <div>{'  '}</div>
            ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
        </div>
      )
    }
    return (
      <div>
        {'  '}
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
