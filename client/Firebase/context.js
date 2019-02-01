import React from 'react';

const FirebaseContext = React.createContext(null);

//Rather than using a render prop component, which is automatically given with React’s Context Consumer component, it may be simpler to use a higher-order component. Let’s implement this higher-order component here:
export const withFirebase = Component => props => {
  return (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};
export default FirebaseContext;

// The createContext() function essentially creates two components. The FirebaseContext.Provider component is used to provide a Firebase instance once at the top-level of your React component tree, which we will do in this section; and the FirebaseContext.Consumer component is used to retrieve the Firebase instance if it is needed in the React component. For a well-encapsulated Firebase module, we’ll define a index.js file in our Firebase folder that exports all necessary functionalities (Firebase class, Firebase context for Consumer and Provider components):
