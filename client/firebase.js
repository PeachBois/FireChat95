import firebase from 'firebase'
firebase.initializeApp({
  apiKey: 'AIzaSyBD2FYD63jQ5XQm2e79NNy2vz1odEjfgQw',
  authDomain: 'fir-exploration-deee2.firebaseapp.com',
  databaseURL: 'https://fir-exploration-deee2.firebaseio.com/',
  projectId: 'fir-exploration-deee2',
  storageBucket: 'fir-exploration-deee2.appspot.com',
  messagingSenderId: '752787901162'
})

export const firebaseDb = firebase.database()

// export function makeRef (path) {
//   return firebaseDb.ref(path)
// }
