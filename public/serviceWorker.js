// importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

const firebase = require('firebase/app');
require('firebase/messaging');

firebase.initializeApp({
  messagingSenderId: '752787901162'
});

const messaging = firebase.messaging();

// Flag for enabling cache in production
const doCache = true;

const CACHE_STATIC_NAME = 'static-cache-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-cache';

// Triggers when user starts the app.
self.addEventListener('install', event => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME).then(cache => {
        const urlsToCache = ['/', '/index.html', '/offline.html'];
        cache.addAll(urlsToCache);
      })
    );
  }
});

// Deleting old chaches
self.addEventListener('activate', event => {
  const currentCacheList = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME];

  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!currentCacheList.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  return self.clients.claim();
});

// Fetch is triggered by the web application of the actual page unlike 'install' & 'activate' where they are triggered by the browser when service workers are being installed or was activated.
self.addEventListener('fetch', event => {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(serverRes =>
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
              cache.put(event.request.url, serverRes.clone());
              return serverRes;
            })
          );
          // TODO: when offline, dynamic cache load??
        }
      })
    );
  }
});

//push event handled here.
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  console.log('push event listener for SW >>EVENT>> : ', event);
  // Push listener
  // let payload = event.data.json();
  // console.log('payload??? ', payload);
  let title =
    (event.data && event.data.text()) || 'Successfully subscribed from SW!';
  let body = event.data.body || 'Shout outs will be delivered!';

  // const title = 'Successfully subscribed from SW!';
  const options = {
    body,
    icon: 'apple-touch-icon-144x144.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400]
    // data: .params
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  let data = event.notification.data;
  event.notification.close();
  // event.waitUntil(caches.openWindow(data.url));
  event.waitUntil(clients.openWindow(event.notification.data));
});
