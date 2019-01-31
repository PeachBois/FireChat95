import React, { Component } from 'react';

// const notificationDisplayStyle = {
//   display: 'inline-block'
// };

class EnableNotifications extends Component {
  constructor() {
    super();
    this.state = {
      style: {}
    };
  }

  componentDidMount() {
    this.setState({
      style: this.props.style
    });
  }

  handleClick = event => {
    console.log('enable notifications component]] >> ', event);
    this.askNotificationPermission();
  };

  askNotificationPermission = () => {
    Notification.requestPermission(result => {
      console.log('User Choice for permission ==> ', result);
      if (result !== 'granted') {
        console.log('No notification permission granted..');
      } else {
        this.setState({
          style: { display: 'none' }
        });
        console.log('Hello.......');
      }
    });
  };

  render() {
    console.log('permission comp. ==this.state.style>> ', this.state.style);
    if (this.state.style.display === 'inline-block') {
      console.log('inside after style inline blocked?', this.state.style);
      return (
        <div className="enable-notifications" style={this.state.style}>
          <button onClick={this.handleClick}>Enable Notifications</button>
        </div>
      );
    } else {
      return (
        <div className="enable-notifications" style={{ display: 'none' }}>
          {/* <button onClick={this.handleClick}>Enable Notifications</button> */}
        </div>
      );
    }
  }
}

export default EnableNotifications;
