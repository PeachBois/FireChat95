import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { withRouter, Route, Switch } from 'react-router-dom'
// import { withFirebase } from '../Firebase/index'
// import { compose } from 'recompose'
// import firebase from 'firebase'
// import { me } from '../store/user'
import SignInGoogle from './SignInGoogle';
import EnableNotifications from './EnableNotifications';

const notificationDisplayStyle = {
  display: 'inline-block'
};

const Login = () => {
  console.log('are you in login???');
  return (
    <div className="box">
      <div className="title">
        <p className="title">ALOL</p>
        <button>X</button>
      </div>
      <div className="body">
        <SignInGoogle />
        {'Notification' in window ? (
          <EnableNotifications style={notificationDisplayStyle} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

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

export default Login;

/**
 * PROP TYPES
 */
