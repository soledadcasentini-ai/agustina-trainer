const CACHE = 'ac-trainer-v3';
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/styles.min.css',
  BASE + '/foto_agustina_hero.webp',
  BASE + '/brand_assets/agustinacasentini03.webp',
  BASE + '/brand_assets/agustinacasentini04.webp',
  BASE + '/brand_assets/agustinacasentini05.webp',
  BASE + '/brand_assets/agustinacasentini06.webp',
  BASE + '/brand_assets/agustinacasentini07.webp',
  BASE + '/brand_assets/agustinacasentini08.webp',
  BASE + '/brand_assets/agustinacasentini09.webp',
  BASE + '/brand_assets/agustinacasentini10.webp',
  BASE + '/brand_assets/agustinacasentini011.webp',
  BASE + '/brand_assets/agustinacasentini012.webp',
  BASE + '/brand_assets/agustinacasentini013.webp',
  BASE + '/brand_assets/agustinacasentini014.webp',
  BASE + '/brand_assets/agustinacasentini015.webp',
  BASE + '/brand_assets/hola_foto_agustina_casentini.svg',
  BASE + '/brand_assets/Asset 4.svg',
  BASE + '/brand_assets/Asset 5.svg',
  BASE + '/brand_assets/Asset 6.svg',
  BASE + '/brand_assets/Asset 7.svg',
  BASE + '/brand_assets/Asset 8.svg',
  BASE + '/brand_assets/Asset 9.svg',
  BASE + '/icon-192.png',
  BASE + '/manifest.json'
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
