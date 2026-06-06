const CACHE_NAME = 'quiz-app-ios-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const clone = response.clone();
      if (event.request.url.includes('/tests/') || event.request.url.endsWith('.quiz.json')) {
        // Do not force-cache large quiz packs; let the browser manage them.
        return response;
      }
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
