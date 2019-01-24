import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

// Use recompose to organize your higher-order components. Since the higher-order components don’t depend on each other, the order doesn’t matter. Otherwise, it may be good to know that the compose function applies the higher-order components from right to left.
import { compose } from 'recompose';

import { withFirebase } from './Firebase';

/**
 * COMPONENT
 */
class RoutesBase extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="box">
        <div className="title">
          <p className="title">ALOL</p>
          <button>X</button>
        </div>
        <div className="body">
          <p className="title">Welcome!</p>
          <div className="inner">
            <p>This is inner text</p>
          </div>
          <button>Submit</button>
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

/**
 * PROP TYPES
 */
