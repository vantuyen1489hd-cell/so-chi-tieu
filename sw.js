/* Service worker — giữ app chạy được khi mất mạng.
   Đổi PHIEN_BAN mỗi lần sửa index.html để máy tải bản mới. */
const PHIEN_BAN = 'so-chi-tieu-v1.2';
const CAN = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(PHIEN_BAN)
      .then(c => c.addAll(CAN))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== PHIEN_BAN).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Font Google: lấy cache trước, có mạng thì cập nhật ngầm
  if (e.request.url.includes('fonts.g')) {
    e.respondWith(
      caches.match(e.request).then(sanCo =>
        sanCo || fetch(e.request).then(res => {
          const ban = res.clone();
          caches.open(PHIEN_BAN).then(c => c.put(e.request, ban));
          return res;
        }).catch(() => sanCo)
      )
    );
    return;
  }

  // File của app: mạng trước, hỏng thì dùng cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const ban = res.clone();
        caches.open(PHIEN_BAN).then(c => c.put(e.request, ban)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
