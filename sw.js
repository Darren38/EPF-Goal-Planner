// Fresh files on every load.
//
// GitHub Pages lets browsers keep the site's files for about ten minutes, so a visitor could get the old page
// after an update. This worker asks the server again for every file of this site ("no-cache": the browser must
// check before using its copy; unchanged files come back as a quick 304).
//
// Everything else is left alone: Google Fonts is another origin and passes straight through.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // a page request can't be copied with new options, so it is fetched again by address
  const fresh = request.mode === 'navigate' ? fetch(request.url, { cache: 'no-cache' }) : fetch(request, { cache: 'no-cache' });
  event.respondWith(fresh.catch(() => fetch(request)));
});
