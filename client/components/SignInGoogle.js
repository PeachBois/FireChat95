import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { me } from '../store/user';

class SignInGoogleBase extends Component {
  constructor() {
    super();
    this.state = {
      error: null
      // user: null
    };
  }

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

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const googleUser = await this.props.firebase.signInWithGoogle();
      console.log('google AUTH USER ===> ', googleUser);
      console.log('this.props ??? >>>>>', this.props);
      await this.props.firebase.user(googleUser.user.uid).set({
        username: googleUser.user.displayName,
        email: googleUser.user.email,
        roles: []
      });

      this.props.me(googleUser.user.displayName);

      this.setState({
        error: null
      });

      this.props.history.push('/chat');
    } catch (err) {
      this.setState({
        error: err
      });
    }
  };

  render() {
    const { error } = this.state;
    console.log('Inside render! error message>>', error);

    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Google Signin</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    me: name => dispatch(me(name))
  };
};

const SignInGoogle = compose(
  withRouter,
  withFirebase,
  connect(null, mapDispatch)
);

export default SignInGoogle(SignInGoogleBase);
