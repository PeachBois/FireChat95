import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

// import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './Firebase';

// establishes socket connection
import './socket';

// Due to the 'FirebaseContext.Provider', every component that is interested in using Firebase has access to the Firebase instance with a FirebaseContext.Consumer component.
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </Provider>,
  document.getElementById('app')
);

//Edwin's Comment: Might need this later. Need more research..
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// ServiceWorker.unregister();
