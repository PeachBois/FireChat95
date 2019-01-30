// In this 'firebase.js' file:
// configures Firebase and implements methods/functions for the Firebase class.
import { compose } from 'recompose';
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
    this.room = null;
  }

  // Auth API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  // User API
  user = uid => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');

  // Method to write new message in chat box.
  writeNewPost = (username, img, body) => {
    // A post entry.

    let postData = {
      username,
      body,
      img
    };
    console.log(postData);

    let newPostKey = this.database
      .ref()
      .child(`/rooms/${this.room}/posts/`)
      .push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[`/rooms/${this.room}/posts/` + newPostKey] = postData;
    console.log(updates);
    return this.database.ref().update(updates);
  };
  createRoom = async (room, email, it) => {
    console.log(room, email, it);
    await this.database.ref().child(`/rooms/${room}-${it}`);
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/users`)
      .push(email);
    this.room = `${room}-${it}`;
  };

  findOrCreateRoom = async (room, email, it = 0) => {
    console.log(room, email, it);

    let users;
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/users`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          users = Object.values(snapshot.val());
          console.log('exists!', users);
        }
      })
      .then(async () => {
        if (!users) {
          console.log('creating');
          await this.createRoom(room, email, it);
          this.room = `${room}-${it}`;
        } else {
          if (users.length >= 2) {
            console.log('restarting');
            await this.findOrCreateRoom(room, email, it + 1);
          } else {
            console.log('adding name');
            await this.database
              .ref()
              .child(`/rooms/${room}-${it}/users`)
              .push(email);
            this.room = `${room}-${it}`;
          }
        }
      });
    return this.room;
  };
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
