const CACHE_NAME = 'neno-safari-v16';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './app-icon.svg',
  './js/content.js?v=16',
  './js/daily-puzzles.js?v=16',
  './js/puzzle-engine.js?v=16',
  './js/i18n.js?v=16',
  './js/storage.js?v=16',
  './js/offline-packs.js?v=16',
  './js/accessibility.js?v=16'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => key === CACHE_NAME ? null : caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
