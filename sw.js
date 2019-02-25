let staticCacheName = 'restaurant-review-v1';
this.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'index.html',
				'restaurant.html',
				'css/styles.css',
				'js/main.js',
				'js/dbhelper.js',
				'js/restaurant_info.js',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg'
			]);
		})
	);
});

this.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-review-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

this.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(e.request).then(networkResponse => {
        if (networkResponse.status === 404) {
          return null;
        }
        return caches.open(staticCacheName).then(cache => {
          cache.put(e.request.url, networkResponse.clone());
          return networkResponse;
        })
      })
    }).catch(error => {
      console.log(error);
      return;
    })
  );
});