import * as firebase from 'firebase/app';
import 'firebase/database';
import { starter } from './firestarters';

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
    this.cap = 0;
    this.messaging = firebase.messaging();
    this.setCloudMessaging();
  }

  // Auth API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  // User API
  user = uid => this.database.ref(`users/${uid}`);
  users = () => this.database.ref('users');
  leaveRoom = async () => {
    await this.database
      .ref(`/rooms/${this.room}/`)
      .child(`rules/mia`)
      .push('remove');
    await this.database
      .ref()
      .child(`/rooms/${this.room}/rules/mia`)
      .once('value', async snapshot => {
        if (snapshot.exists()) {
          if (Object.keys(snapshot.val()).length >= this.cap - 1) {
            await this.database
              .ref()
              .child(`/rooms/${this.room}`)
              .remove();
          }
        }
      });
    this.room = null;
  };
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
    // console.log(updates)
    return this.database.ref().update(updates);
  };
  createRoom = async (room, email, cap, it) => {
    // console.log(room, email, it)
    await this.database.ref().child(`/rooms/${room}-${it}`);
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/users`)
      .push(email);
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/rules`)
      .push(cap);
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/posts`)
      .push({
        username: 'Winney',
        body: starter(),
        img: `./computer.png`
      });

    this.room = `${room}-${it}`;
  };

  findOrCreateRoom = async (room, email, cap, it = 0) => {
    this.cap = cap;
    let users;
    let roomCap;
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/`)
      .once('value', async snapshot => {
        if (snapshot.exists()) {
          if (snapshot.val().users) {
            users = Object.values(snapshot.val().users);
          } else {
            await this.database.ref(`/rooms/${room}-${it}`).remove();
            setTimeout(() => {}, 1000);
            await this.findOrCreateRoom(room, email, cap, it);
            await this.database.ref(`/rooms/${room}-${it}/users`).remove();
            await this.database.ref(`/rooms/${room}-${it}/users`).push(email);
          }
          roomCap = Object.values(snapshot.val().rules)[0];
          console.log(roomCap);
        }
      })

      .then(async () => {
        if (!users) {
          // console.log('creating')
          await this.createRoom(room, email, cap, it);
          this.room = `${room}-${it}`;
        } else {
          console.log(
            'cap:',
            cap,
            'room cap:',
            roomCap,
            'users:',
            users.length
          );
          if (cap < users.length || users.length >= roomCap) {
            // console.log('restarting')
            await this.findOrCreateRoom(room, email, cap, it + 1);
          } else {
            // console.log('adding name')
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

  //Giving permission for FCM notifications & access and saving FCM token
  setCloudMessaging = () => {
    const messaging = this.messaging;
    messaging
      .requestPermission()
      .then(() => {
        console.log('FCM Message permission granted!', this.messaging);
        return this.messaging.getToken();
      })
      .then(token => {
        console.log('fcm token: ', token);
      })
      .catch(error => {
        console.error('Error while getting message permission: ', error);
      });
  };

  // setLogin = user => {
  //   this.saveFCMToken();
  // };

  // saveFCMToken = () => {
  //   const cbGetToken = token => {
  //     console.log('setLogin fcmId get: ', token);
  //     const userUid = this.auth.currentUser.uid;
  //     const fcmIdRef = this.database.ref('FcmId/' + userUid);
  //     fcmIdRef.set(token);
  //   };

  //   this.messaging()
  //     .getToken()
  //     .then(cbGetToken.bind(this))
  //     .catch(error => {
  //       console.error('Error while verifying fcmId...', error);
  //     });
  // };
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
