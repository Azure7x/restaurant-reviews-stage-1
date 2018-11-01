// I got a large amount of help for this service worker from
//https://www.youtube.com/watch?v=ksXwaWHCW6k&t=624s


let cacheName = 'v1';

self.addEventListener('activate', function(e) {

//this makes the acitivate the service worker after it deletes the other caches that that are not current
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    })
  )
})


self.addEventListener('fetch', e => {

  e.respondWith(
    fetch(e.request)
      .then(res => {
        //makes a copy of the request and stores it in a cache
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      //returns the cached request if offline
      .catch(err => caches.match(e.request).then(res => res))
  );
});
