let cacheName = 'v4';
// let cacheFiles = [
//   'index.html',
//   'restaurant.html',
//   '/css/styles.css',
//   '/js/main.js',
//   '/js/dbhelper.js',
//   '/js/restaurant_info.js',
//   '/data/restaurants.json',
//   '/img/1.jpg',
//   '/img/2.jpg',
//   '/img/3.jpg',
//   '/img/4.jpg',
//   '/img/5.jpg',
//   '/img/6.jpg',
//   '/img/7.jpg',
//   '/img/8.jpg',
//   '/img/9.jpg',
//   '/img/10.jpg'
//
// ];

self.addEventListener('install', function(e) {
  console.log('serviceworker is installed part three');

  // e.waitUntil(
  //   caches.open(cacheName)
  //   .then(cache => {
  //     console.log('service worker: caching files');
  //     cache.addAll(cacheFiles);
  //   })
  // )
})

self.addEventListener('activate', function(e) {

  console.log('service worker activated');

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            console.log('service worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

// self.addEventListener('fetch', e => {
//   console.log('service worker: fetching');
//   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// });

self.addEventListener('fetch', e => {
  console.log('service worker: fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
