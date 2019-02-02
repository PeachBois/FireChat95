import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import { me } from '../store/user'

const SignInGoogleBase = props => {
  // componentDidMount() {
  //   this.authListener();
  // }

  // authListener = () => {
  //   this.props.firebase.auth().onAuthStateChanged(user => {
  //     console.log('user auth ----->>> ', user);
  //     if (user) {
  //       this.setState({ user });
  //       localStorage.setItem('user', user.uid);
  //     } else {
  //       this.setState({ user: null });
  //       localStorage.removeItem('user');
  //     }
  //   });
  // };

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const googleUser = await props.firebase.signInWithGoogle()
      console.log(googleUser)
      await props.firebase.user(googleUser.user.uid).set({
        username: googleUser.user.displayName,
        email: googleUser.user.email,
        imgUrl: googleUser.user.photoURL,
        roles: []
      })
      const user = {
        username: googleUser.user.displayName,
        email: googleUser.user.email,
        imgUrl: googleUser.user.photoURL,
        roles: []
      }

      props.me(user)

      props.history.push('/setup')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit' className='google'>
        <img className='google' src='./google.png' />
      </button>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    me: user => dispatch(me(user))
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
  connect(
    null,
    mapDispatch
  )
)

export default SignInGoogle(SignInGoogleBase)
