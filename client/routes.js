import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
// Use recompose to organize your higher-order components. Since the higher-order components don’t depend on each other, the order doesn’t matter. Otherwise, it may be good to know that the compose function applies the higher-order components from right to left.
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import MessageBox from './components/messageBox'
import Login from './components/login'
import RoomSetUp from './components/room-set-up'
import ChangeName from './components/changeName'
import GoogleMap from './components/map'
import Loading from './components/loading'

class RoutesBase extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {/* <Route path='/' component={GoogleMap} /> */}
        <Route exact path='/' component={Login} />
        <Route exact path='/chat' component={MessageBox} />
        {/* <Route exact path='/navtest' component={RoomSetUp} /> */}
        <Route exact path='/setup' component={ChangeName} />
        <Route exact path='/locating' component={Loading} />
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

const Routes = compose(
  withRouter,
  withFirebase,
  connect(mapState, mapDispatch)
);

export default Routes(RoutesBase);

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));
