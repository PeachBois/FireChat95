import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase/index';
import { compose } from 'recompose';
import firebase from 'firebase';

class messageBox extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      body: '',
      postList: []
    };
  }
  componentDidMount() {
    let postList = [];
    const dbRefObject = firebase
      .database()
      .ref()
      .child('posts');

    dbRefObject.on('value', snap => {
      postList = [];
      const postObj = snap.val();
      let key = Object.keys(postObj);
      for (key in postObj) {
        postList.push(postObj[key]);
      }
      this.setState({ postList, username: this.props.username });
    });
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    this.props.firebase.writeNewPost(this.state.username, this.state.body);
  };

  render() {
    let { body } = this.state;

    return (
      <div className="box">
        <div className="title">
          <p className="title">ALOL</p>
          <button>X</button>
        </div>
        <div className="body">
          <p className="title">Welcome {this.state.username}!</p>
          <div className="inner">
            {this.state.postList.map(entry => {
              return (
                <div id={entry.body}>
                  <p>{`${entry.username}: ${entry.body}`}</p>
                </div>
              );
            })}
          </div>
          <input
            type="text"
            value={body}
            name="body"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return { username: 'Edwin' };
};

const mapDispatch = dispatch => {
  return {};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(mapState, mapDispatch)
);

export default MessageBoxConnect(messageBox);

/**
 * PROP TYPES
 */
