//This file is for the browser notifications (push, allow, etc) referring to the service worker.

// Let's check if the browser supports notifications
if (!('Notification' in window)) {
  console.error('This browser does not support desktop notification')
} else if (Notification.permission === 'granted') {
  // Let's check whether notification permissions have already been granted
  console.log('Permission to receive notifications has been granted')
} else if (Notification.permission !== 'denied') {
  // Otherwise, we need to ask the user for permission
  Notification.requestPermission(function (permission) {
    // If the user accepts, let's create a notification
    if (permission === 'granted') {
      console.log('Permission to receive notifications has been granted')
    }
  })
}

const applicationServerPublicKey =
  'BGxU1FL5j9wAcBJU8njdLKVZFnkItOWjMyQOxUKLZY4qxHSA7X1wo9siTgDjo5UwQ8l4CqCUsjn9MVLTkdqEQfg'
let swRegistration

const pushButton = document.createElement('BUTTON')
document.body.appendChild(pushButton)

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', function () {
    // Registering service worker.
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(
        function (registration) {
          console.log('Service worker registration successful!', registration)
          swRegistration = registration
          initialiseUI()
        },
        function (err) {
          console.log('Worker registration failed', err)
        }
      )
      .catch(function (err) {
        console.log(err)
      })
  })
} else {
  console.log('Service Worker is not supported by browser.')
  console.log('Push messaging not supported.')
  pushButton.textContent = 'Push not supported'
}

let isSubscribed
function initialiseUI () {
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true
    if (isSubscribed) {
      // Unsubscribe user
      unsubscribeUser()
    } else {
      subscribeUser()
    }
  })
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription().then(function (subscription) {
    // console.log('what is subscription??>> ', subscription);
    isSubscribed = !(subscription === null)
    if (isSubscribed) {
      console.log('User IS subscribed.')
    } else {
      console.log('User is NOT subscribed.')
    }

    updateBtn()
  })
}

function updateBtn () {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.'
    pushButton.disabled = true
    updateSubscriptionOnServer(null)
    return
  }
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging'
  } else {
    pushButton.textContent = 'Enable Push Messaging'
  }

  pushButton.disabled = false
}

function subscribeUser () {
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey)
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function (subscription) {
      console.log('User is subscribed:', subscription)

      updateSubscriptionOnServer(subscription)

      isSubscribed = true

      updateBtn()
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err)
      updateBtn()
    })
}

async function updateSubscriptionOnServer (subscription) {
  // Send subscription to firebase application server
  const subscriptionJSON = await fetch(
    'https://fir-exploration-deee2.firebaseio.com/subscriptions.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(subscription)
    }
  )
  // console.log(
  //   'after firebase subscribed: subscriptionJSON ==> ',
  //   subscriptionJSON
  // );
  return subscriptionJSON
}

function unsubscribeUser () {
  swRegistration.pushManager
    .getSubscription()
    .then(function (subscription) {
      if (subscription) {
        // TODO: Tell application server to delete subscription

        return subscription.unsubscribe()
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error)
    })
    .then(function () {
      updateSubscriptionOnServer(null)

      console.log('User is unsubscribed.')
      isSubscribed = false

      updateBtn()
    })
}

// helper util function for the vapid key convert.
function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
