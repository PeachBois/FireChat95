//Flag for enabling cache in production
const doCache = true;

const CACHE_STATIC_NAME = 'static-cache';
const CACHE_DYNAMIC_NAME = 'dynamic-cache';

console.log('++++++++HELLO!!!! from SERVICE WORKER!!!>>>>>>');

//below needs more work done..

//Triggers when user starts the app.
self.addEventListener('install', event => {
  console.log('INSTALLING Service worker!!');
  console.log('Install EVENT >>>> ', event);
  if (doCache) {
    console.log('Inside doCache if statement==caches=>', caches);
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME).then(cache => {
        console.log('Service Worker: Pre-cache App Shell!!', cache);

        const urlsToCache = ['/', '/index.html'];
        cache.addAll(urlsToCache);

        // //Edwin's comment: not sure about this part.. Comeback..
        // fetch('manifest.json')
        //   .then(response => {
        //     response.json();
        //   })
        //   .then(assets => {
        //     const urlsToCache = ['/', assets['index.html']];
        //     cache.addAll(urlsToCache);
        //   });
      })
    );
  }
});

//Deleting old chaches
self.addEventListener('activate', event => {
  console.log('ACTIVATING Service worker!!');
  console.log('Activate EVENT >>>> ', event);

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

//In here, intercepts the network request and serves up the matching files.
//Fetch is triggered by the web application of the actual page unlike 'install' & 'activate' where they are triggered by the browser when service workers are being installed or was activated.
self.addEventListener('fetch', event => {
  console.log('FETCHING Service worker!!');
  console.log('Fetch EVENT >>>> ', event);
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
        }
      })
    );
  }
});
