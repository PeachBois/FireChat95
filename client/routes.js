import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import MessageBox from './components/messageBox'
import Login from './components/login'
import ChangeName from './components/changeName'
import Loading from './components/loading'

class RoutesBase extends Component {
  componentDidMount () {}

  render () {
    return (
      <div>
        <Route exact path='/' component={Login} />
        <Route exact path='/chat' component={MessageBox} />
        <Route exact path='/setup' component={ChangeName} />
        <Route exact path='/locating' component={Loading} />
      </div>
    )
  }
}

const Routes = compose(
  withRouter,
  withFirebase
)

export default Routes(RoutesBase)

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));
