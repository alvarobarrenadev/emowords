const CACHE_NAME = 'emowords-v2';

// Get the base path dynamically from the service worker's location
const BASE_PATH = self.location.pathname.replace('/sw.js', '') || '/';

// Assets we definitely want to cache immediately
const INITIAL_CACHE = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'favicon/site.webmanifest',
  BASE_PATH + 'favicon/favicon.ico',
  BASE_PATH + 'favicon/favicon-96x96.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      // Use addAll with error handling for individual resources
      return Promise.allSettled(
        INITIAL_CACHE.map(url => 
          cache.add(url).catch(err => console.warn('Failed to cache:', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignorar peticiones no HTTP (como chrome-extension://)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Chequear si recibimos una respuesta válida
        if (!response || response.status !== 200) {
          return response;
        }

        // Clonar la respuesta
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // Si es una navegación (documento html) y falla, devolver index.html
          // Esto permite que el SPA cargue offline en cualquier ruta
          if (event.request.mode === 'navigate') {
             return caches.match(BASE_PATH + 'index.html');
          }
        });
      })
  );
});
