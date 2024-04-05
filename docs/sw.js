if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.2/workbox-sw.js");
  if (workbox) {
    workbox.setConfig({debug: false});
    self.addEventListener("install", event => {
      self.skipWaiting();
    });
    workbox.precaching.precacheAndRoute([{"revision":"0a809044f0c712ae3f365a46e34a82f5","url":"apple-touch-icon.png"},{"revision":"c1d05502c5701c20e0fde9025241c160","url":"asset-manifest.json"},{"revision":"0334508f1aef86d77b88b7f055c7db7b","url":"favicon-16x16.png"},{"revision":"691d0562d542c18a8ff6a140e1477836","url":"favicon-32x32.png"},{"revision":"86eb41d227321e539f31980908282ca3","url":"favicon.ico"},{"revision":"4d5f817892ee143a857c87b6c85ccd39","url":"index.html"},{"revision":"bdca1c72f292f9d573673f054a9ed869","url":"logo.png"},{"revision":"0c80943e869583ef80dba6b5bf5df66f","url":"logo192.png"},{"revision":"337e46115678a33391984ce177ee5e3a","url":"manifest.json"},{"revision":"7a0be28e888280a0f22b9b877f70675b","url":"static/css/main.83354c8b.css"},{"revision":"5e4b18ecdb2f06e5a9e2ed59a68a2634","url":"static/js/main.3b647e7b.js"},{"revision":"50415b83393c6251b500f4f9f8c5bc1f","url":"test.html"},{"revision":"24f2b115d3964c9f977462cdd38b066a","url":"wasm/koder.js"},{"revision":"6f11e7db4fe9aca82cac7150bfc33769","url":"wasm/zbar.js"},{"revision":"e8789bf03df9c2c85e9c59ab0a0cd0c6","url":"wasm/zbar.wasm"},{"revision":"13905aa52f24b160906a738a9ae82543","url":"wasmWorker.js"}]);
    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      new workbox.strategies.CacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            maxEntries: 30
          })
        ]
      })
    );
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
    workbox.routing.registerRoute(
      /\.(?:js|css|wasm|json)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
          })
        ]
      })
    );
  } else console.error("Workbox could not be loaded. No offline support");
}