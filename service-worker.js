const CACHE_NAME = 'neno-safari-v58';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './app-icon.svg',
  './privacy-policy.html',
  './assets/theme-art/ocean.svg',
  './assets/theme-art/savanna.svg',
  './assets/theme-art/kilimanjaro.svg',
  './assets/theme-art/zanzibar.svg',
  './assets/theme-art/dar.svg',
  './js/content.js?v=57',
  './js/daily-puzzles.js?v=57',
  './js/puzzle-engine.js?v=57',
  './js/i18n.js?v=57',
  './js/storage.js?v=57',
  './js/review-scheduler.js?v=57',
  './js/accessibility.js?v=57',
  './js/ui-utils.js?v=57',
  './js/offline-packs.js?v=57',
  './js/haptics.js?v=57'
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
