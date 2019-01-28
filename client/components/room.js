import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import Geohash from 'latlon-geohash';

class RoomBase extends Component {
  constructor() {
    super();
    this.state = {
      roomId: ''
    };
  }

  handleClick = async event => {
    console.log(this.props);
    console.log('==room.js==>', navigator.geolocation);
    this.setState({
      roomId: await this.props.firebase.roomInit()
    });

    console.log('After handleClick, this.state ==> ', this.state);
  };

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleClick}>
          Click
        </button>
      </div>
    );
  }
}

const Room = compose(withRouter, withFirebase);

export default Room(RoomBase);
