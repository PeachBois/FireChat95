//Flag for enabling cache in production
const doCache = true;

const CACHE_NAME = 'pwa-app-cache';

console.log('++++++++HELLO!!!! from SERVICE WORKER!!!>>>>>>');

//Deleting old chaches
self.addEventListener('activate', event => {
  console.log('ACTIVATING!!!!');
  console.log('EVENT >>>> ', event);
  const currentCacheList = [CACHE_NAME];
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
});

//Triggers when user starts the app.
self.addEventListener('install', event => {
  console.log('INSTALLING!!!!');
  console.log('EVENT >>>> ', event);
  if (doCache) {
    event.waitUntil(caches.open(CACHE_NAME)).then(cache => {
      fetch('manifest.json')
        .then(response => {
          response.json();
        })
        .then(assets => {
          //Edwin's comment: not sure about this part.. Comeback..
          //Caches initial page and './index.js??
          //Could also cache assets like CSS and images
          const urlsToCache = ['/', assets['bundle.js']];
          cache.addAll(urlsToCache);
        });
    });
  }
});

//In here, intercepts the network request and serves up the matching files
self.addEventListener('fetch', event => {
  console.log('FETCHING!!!!');
  console.log('EVENT >>>> ', event);
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
