import * as firebase from 'firebase/app'
import 'firebase/database'
import { starter } from './firestarters'
import { getGif } from '../components/utils'

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
    this.firebase = firebase
    firebase.initializeApp(config)
    this.database = firebase.database()
    this.auth = firebase.auth()
    this.posts = []
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.room = null
    this.cap = 0
  }

  // Auth API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  // User API
  user = uid => this.database.ref(`users/${uid}`)
  users = () => this.database.ref('users')
  leaveRoom = async id => {
    console.log(id)
    await this.database
      .ref(`/rooms/${this.room}/users/`)
      .child(id)
      .remove()
    await this.database
      .ref()
      .child(`/rooms/${this.room}/users`)
      .once('value', async snapshot => {
        if (snapshot.exists()) {
          if (Object.keys(snapshot.val()).length <= 1) {
            await this.database.ref(`/rooms/${this.room}`).remove()
          }
        }
      })
    this.room = null
  }
<<<<<<< HEAD
  // Method to write new message in chat box.
  writeNewPost = async (username, img, body, color='#FF0000') => {
    // A post entry.

=======
  writeNewPost = async (username, img, body) => {
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
    let str = body
    if (str.includes(':')) {
      let first = str.indexOf(':') + 1
      let last = str.lastIndexOf(':')
      console.log(str.slice(first, last))
      const gif = await getGif(str.slice(first, last))
      str = { img: gif }
      body = str
    }
    let postData = {
      username,
      body,
      img,
      color
    }
    let newPostKey = this.database
      .ref()
      .child(`/rooms/${this.room}/posts/`)
      .push().key
    var updates = {}
    updates[`/rooms/${this.room}/posts/` + newPostKey] = postData
    return this.database.ref().update(updates)
  }
<<<<<<< HEAD
  createRoom = async (room, email, cap, img, color, it) => {
    // console.log(room, email, it)
    await this.database.ref().child(`/rooms/${room}-${it}`)
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/users`)
      .push({ email, img, color })
=======
  createRoom = async (room, cap, img, username, color = 'red', it) => {
    await this.database.ref().child(`/rooms/${room}-${it}`)
    await this.database
      .ref(`/rooms/${room}-${it}/users`)
      .push({ username, img, color })
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/rules`)
      .push(cap)
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}`)
      .update({ timestamp: Date.now() })
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/posts`)
      .push({
        username: 'Winney',
        body: starter(),
        img: `./computer.png`
      })
    this.room = `${room}-${it}`
  }

<<<<<<< HEAD
  findOrCreateRoom = async (room, cap, img, username, color, it = 0) => {
=======
  findOrCreateRoom = async (
    room,
    cap,
    img,
    username,
    color = 'red',
    it = 0
  ) => {
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
    this.cap = cap
    console.log(room)
    let users
    let roomCap
    await this.database
      .ref()
      .child(`/rooms/${room}-${it}/`)
      .once('value', async snapshot => {
        if (snapshot.exists()) {
          if (snapshot.val().users) {
            users = Object.values(snapshot.val().users)
          } else {
            await this.database.ref(`/rooms/${room}-${it}`).remove()
            setTimeout(() => {}, 1000)
<<<<<<< HEAD
            await this.findOrCreateRoom(room, cap, img, username, color, it)
=======
            await this.findOrCreateRoom(room, cap, img, it)
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
            await this.database.ref(`/rooms/${room}-${it}/users`).remove()
            await this.database
              .ref(`/rooms/${room}-${it}/users`)
              .push({ username, img, color })
          }
          roomCap = Object.values(snapshot.val().rules)[0]
          console.log(roomCap)
        }
      })
      .then(async () => {
        if (!users) {
<<<<<<< HEAD
          // console.log('creating')
          await this.createRoom(room, cap, img, username, color, it)
=======
          await this.createRoom(room, cap, img, username, (color = 'red'), it)
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
          this.room = `${room}-${it}`
        } else {
          console.log('cap:', cap, 'room cap:', roomCap, 'users:', users.length)
          if (cap < users.length || users.length >= roomCap) {
<<<<<<< HEAD
            // console.log('restarting')
            await this.findOrCreateRoom(room, cap, img, username, color, it + 1)
=======
            await this.findOrCreateRoom(
              room,
              cap,
              img,
              username,
              (color = 'red'),
              it + 1
            )
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
          } else {
            await this.database
<<<<<<< HEAD
              .ref()
              .child(`/rooms/${room}-${it}/users`)
              .push({ username, img, color})
=======
              .ref(`/rooms/${room}-${it}/users`)
              .push({ username, img, color })
>>>>>>> fba21d49a488de7b081538914edb17fc682d7e45
            this.room = `${room}-${it}`
          }
        }
      })
    return this.room
  }
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
