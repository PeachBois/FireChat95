// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

// require('firebase/firebase-messaging');
const config = {
  messagingSenderId: '752787901162'
}

// Initialize the Firebase app in the service worker by passing in the messagingSenderId
firebase.initializeApp(config)

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging()

// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method.
messaging.setBackgroundMessageHandler(function (payload) {
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/computer.png'
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

// Flag for enabling cache in production
const doCache = true

const CACHE_STATIC_NAME = 'static-cache-v2'
const CACHE_DYNAMIC_NAME = 'dynamic-cache'

// Triggers when user starts the app.
self.addEventListener('install', event => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME).then(cache => {
        const urlsToCache = ['/', '/index.html']
        cache.addAll(urlsToCache)
      })
    )
  }
})

// Deleting old chaches
self.addEventListener('activate', event => {
  const currentCacheList = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME]

  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!currentCacheList.includes(key)) {
            return caches.delete(key)
          }
        })
      )
    )
  )

  return self.clients.claim()
})

// Fetch is triggered by the web application of the actual page unlike 'install' & 'activate' where they are triggered by the browser when service workers are being installed or was activated.
self.addEventListener('fetch', event => {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response
        } else {
          return fetch(event.request).then(serverRes =>
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
              cache.put(event.request.url, serverRes.clone())
              return serverRes
            })
          )
          // TODO: when offline, dynamic cache load??
        }
      })
    )
  }
})

// push event handled here.
self.addEventListener('push', function (event) {
  // Push listener
  let payload = event.data.json()
  let title = payload.notification.title || 'Successfully subscribed from SW!'
  let body = payload.notification.body || 'Shout outs will be delivered!'
  let data = payload.notification.click_action || 'Data here.'

  const options = {
    body,
    icon: 'computer.png',
    data,
    vibrate: [200, 100, 200, 100, 200, 100, 400]
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  let data = event.notification.data
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data))
})
