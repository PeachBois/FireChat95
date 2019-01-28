import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase/index';
import { compose } from 'recompose';
import firebase from 'firebase';
import { me } from '../store/user';
import SignInGoogle from './SignInGoogle';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    this.props.me(this.state.username);
    this.props.history.push('/chat');
  };

  render() {
    let { username } = this.state;

    return (
      <div className="box">
        <div className="title">
          <p className="title">ALOL</p>
          <button>X</button>
        </div>
        <div className="body">
          <p className="title">Please Set Username!</p>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Login
          </button>
        </div>
        <div className="body">
          <SignInGoogle handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    me: name => dispatch(me(name))
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(mapState, mapDispatch)
);

export default MessageBoxConnect(Login);

/**
 * PROP TYPES
 */
