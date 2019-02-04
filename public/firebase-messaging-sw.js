// importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
// importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');

import * as firebaseapp from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBD2FYD63jQ5XQm2e79NNy2vz1odEjfgQw',
  authDomain: 'fir-exploration-deee2.firebaseapp.com',
  databaseURL: 'https://fir-exploration-deee2.firebaseio.com',
  projectId: 'fir-exploration-deee2',
  storageBucket: 'fir-exploration-deee2.appspot.com',
  messagingSenderId: '752787901162'
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/Icon_Bird_512x512.png'
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
