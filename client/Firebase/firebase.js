// In this 'firebase.js' file:
// configures Firebase and implements methods/functions for the Firebase class.

import * as firebase from 'firebase/app'
import 'firebase/database'
import { getGeoHash } from '../components/utils'
// import app from 'firebase/app';

// Initializing Firebase:
const config = {
  apiKey: 'AIzaSyBD2FYD63jQ5XQm2e79NNy2vz1odEjfgQw',
  authDomain: 'fir-exploration-deee2.firebaseapp.com',
  databaseURL: 'https://fir-exploration-deee2.firebaseio.com',
  projectId: 'fir-exploration-deee2',
  storageBucket: 'fir-exploration-deee2.appspot.com',
  messagingSenderId: '752787901162'
}

class Firebase {
  constructor () {
    firebase.initializeApp(config)
    this.database = firebase.database()
    this.auth = firebase.auth()
    this.posts = []
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
  }

  // Auth API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  // User API
  user = uid => this.database.ref(`users/${uid}`)
  users = () => this.database.ref('users')

  // Method to write new message in chat box.
  writeNewPost = (username, body, hash) => {
    // A post entry.

    let postData = {
      username,
      body
    }
    console.log(postData)

    let newPostKey = this.database
      .ref()
      .child('posts')
      .push().key
    console.log(newPostKey)
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates[`/rooms/${hash}` + newPostKey] = postData
    console.log(updates)
    return this.database.ref().update(updates)
  }
  findOrCreateRoom = async room => {
    console.log(room)
    if (!this.database.ref().child(`rooms/${room}`)) {
      this.database.ref().child(`rooms/${room}`)
    }
  }

  // Add any relevant methods if we need to access the Firebase in our react components.
}

export default Firebase

// export const firebaseDb = firebase.database()
// const auth = firebase.auth();
// const messaging = firebase.messaging();
// const functions = firebase.functions();
// const storage = firebase.storage();

// export function makeRef(path) {
//   return firebaseDb.ref(path);
// }
