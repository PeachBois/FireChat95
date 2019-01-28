// In this 'firebase.js' file:
// configures Firebase and implements methods/functions for the Firebase class.

import * as firebase from 'firebase/app';
import 'firebase/database';
// import app from 'firebase/app';
import Geohash from 'latlon-geohash';

// Initializing Firebase:
const config = {
  apiKey: 'AIzaSyBD2FYD63jQ5XQm2e79NNy2vz1odEjfgQw',
  authDomain: 'fir-exploration-deee2.firebaseapp.com',
  databaseURL: 'https://fir-exploration-deee2.firebaseio.com',
  projectId: 'fir-exploration-deee2',
  storageBucket: 'fir-exploration-deee2.appspot.com',
  messagingSenderId: '752787901162'
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.auth = firebase.auth();
    this.posts = [];
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.geoHashRoom = {
      room: null,
      precision: 6
    };
  }

  //Auth API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  //User API
  user = uid => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');

  //Method to write new message in chat box.
  writeNewPost = (username, body) => {
    // A post entry.
    let postData = {
      username,
      body
    };
    console.log(postData);

    let newPostKey = this.database
      .ref()
      .child('posts')
      .push().key;
    console.log(newPostKey);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    console.log(updates);
    return this.database.ref().update(updates);
  };

  // Add any relevant methods if we need to access the Firebase in our react components.

  //Geohash Room creator method
  roomInit = async () => {
    console.log('navigator geolocation >>>> ', navigator.geolocation);
    const geolocation = await navigator.geolocation;
    console.log('geolocation===???===> ', geolocation);
    if (geolocation) {
      return geolocation.getCurrentPosition(
        position => {
          console.log('Inside firebase roomInit() ===> ', position);
          // const geohash = Geohash.encode(
          //   position.coords.latitude,
          //   position.coords.longitude,
          //   this.geoHashRoom.precision
          // );

          // //Initialize the room based on the geohash
          // this.geoHashRoom.room = this.database.ref().child('rooms/' + geohash);
        },
        err => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    } else {
      console.error('Not Supported!!!');
    }

    const location = new Promise((resolve, reject) => {
      if (geolocation) {
        console.log('roomInit method triggered???!!!!', geolocation);
        geolocation.getCurrentPosition(position => {
          console.log(position, '<<======= this is the position');
          resolve(showLocation);
        });
      } else {
        reject(new Error('Not Supported!!!'));
      }
    });
    return location;
  };

  //   //Utility functions for Geohash room creator's roomInit():
  //   showLocation = position => {
  //     console.log('Inside firebase roomInit() ===> ', position);
  //     const geohash = Geohash.encode(
  //       position.coords.latitude,
  //       position.coords.longitude,
  //       this.geoHashRoom.precision
  //     );

  //     //Initialize the room based on the geohash
  //     this.geoHashRoom.room = this.database.ref().child('rooms/' + geohash);
  //   };

  //   showError = err => {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   };
}

export default Firebase;

// export const firebaseDb = firebase.database()
// const auth = firebase.auth();
// const messaging = firebase.messaging();
// const functions = firebase.functions();
// const storage = firebase.storage();

// export function makeRef(path) {
//   return firebaseDb.ref(path);
// }
