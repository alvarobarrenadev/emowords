const CACHE_NAME = 'emowords-v3';

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
  // Ignorar peticiones no HTTP
  if (!event.request.url.startsWith('http')) return;

  // ESTRATEGIA 1: Navegación (HTML) -> Network First, luego Cache
  // Queremos siempre la versión más reciente del HTML para tener los links correctos a los JS/CSS nuevos.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response;
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => {
          // Si falla la red, devuelve el index.html de caché (SPA support)
          return caches.match(BASE_PATH + 'index.html').then(response => {
            return response || caches.match(event.request);
          });
        })
    );
    return;
  }

  // ESTRATEGIA 2: Assets (JS, CSS, Imágenes, Fuentes) -> Cache First, luego Network
  // Los archivos de Vite tienen hashes (ej: index-Ah32.js). Si el nombre es igual, el contenido es igual.
  // Es seguro devolverlo desde caché inmediatamente.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no está en caché, vamos a la red
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return response;
        });
    })
  );
});
