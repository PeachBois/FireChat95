import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase/index';
import { compose } from 'recompose';
import firebase from 'firebase';

class messageBox extends Component {
  constructor() {
    super();
    this.state = {
      body: '',
      postList: []
    };
  }
  async componentDidMount() {
    const { username } = this.props.user;
    const hash = this.props.hash;
    if (typeof username !== 'string') {
      this.props.history.push('/');
    }
    let postList = [];
    console.log(hash);
    const dbRefObject = firebase
      .database()
      .ref()
      .child(`/rooms/${hash}/posts`);

    dbRefObject.on('value', snap => {
      postList = [];
      const postObj = snap.val();
      let key;
      if (postObj) {
        Object.keys(postObj);

        for (key in postObj) {
          postList.push(postObj[key]);
        }
        this.setState({ postList });
      }
    });

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { username, imgUrl } = this.props.user;
    const hash = this.props.hash;
    const body = this.state.body;
    this.props.firebase.writeNewPost(username, imgUrl, body);
    this.setState({ body: '' });
  };

  hashCode = str => {
    // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  intToRGB = i => {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  scrollToBottom = () => {
    this.messageEnd.scrollIntoView({ behavior: 'smooth' });
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
          <p className="title">Welcome!</p>
          <div className="inner">
            {this.state.postList.map(entry => {
              // console.log(entry)
              return (
                <div
                  className="message"
                  key={this.hashCode(entry.body + Math.random())}
                >
                  <img src={entry.img} className="chatImg" />
                  <p
                    style={{
                      color: this.intToRGB(this.hashCode(entry.username))
                    }}
                  >
                    {entry.username}
                  </p>
                  <p>:{entry.body}</p>
                </div>
              );
            })}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messageEnd = el;
              }}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={body}
              name="body"
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return { user: state.user, hash: state.posts.hash };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(withRouter, withFirebase, connect(mapState));

export default MessageBoxConnect(messageBox);

/**
 * PROP TYPES
 */
