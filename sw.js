const CACHE = 'ac-trainer-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/foto_agustina_hero.webp',
  '/brand_assets/agustinacasentini03.webp',
  '/brand_assets/agustinacasentini04.webp',
  '/brand_assets/agustinacasentini05.webp',
  '/brand_assets/agustinacasentini06.webp',
  '/brand_assets/agustinacasentini07.webp',
  '/brand_assets/agustinacasentini08.webp',
  '/brand_assets/agustinacasentini09.webp',
  '/brand_assets/agustinacasentini10.webp',
  '/brand_assets/agustinacasentini011.webp',
  '/brand_assets/agustinacasentini012.webp',
  '/brand_assets/agustinacasentini013.webp',
  '/brand_assets/agustinacasentini014.webp',
  '/brand_assets/agustinacasentini015.webp',
  '/brand_assets/hola_foto_agustina_casentini.svg',
  '/brand_assets/Asset 4.svg',
  '/brand_assets/Asset 5.svg',
  '/brand_assets/Asset 6.svg',
  '/brand_assets/Asset 7.svg',
  '/brand_assets/Asset 8.svg',
  '/brand_assets/Asset 9.svg',
  '/icon-192.png',
  '/manifest.json'
];

// Instalar: pre-cachear todos los assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar: limpiar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para assets, network-first para navegación
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
