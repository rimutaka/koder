if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.2/workbox-sw.js");
  if (workbox) {
    workbox.setConfig({debug: false});
    self.addEventListener("install", event => {
      self.skipWaiting();
    });
    workbox.precaching.precacheAndRoute([{"revision":"0a809044f0c712ae3f365a46e34a82f5","url":"apple-touch-icon.png"},{"revision":"fd3bd5f2b474879caf778d24d9858d32","url":"asset-manifest.json"},{"revision":"0334508f1aef86d77b88b7f055c7db7b","url":"favicon-16x16.png"},{"revision":"691d0562d542c18a8ff6a140e1477836","url":"favicon-32x32.png"},{"revision":"86eb41d227321e539f31980908282ca3","url":"favicon.ico"},{"revision":"d1f2746193128a571074b407a217df47","url":"index.html"},{"revision":"bdca1c72f292f9d573673f054a9ed869","url":"logo.png"},{"revision":"0c80943e869583ef80dba6b5bf5df66f","url":"logo192.png"},{"revision":"337e46115678a33391984ce177ee5e3a","url":"manifest.json"},{"revision":"99fd0452ca878af5f2fb38200e8a2f6f","url":"static/css/main.09076e79.css"},{"revision":"37a58d8e4ea180716d6fe7235310621c","url":"static/js/main.5ee50c06.js"},{"revision":"50415b83393c6251b500f4f9f8c5bc1f","url":"test.html"},{"revision":"24f2b115d3964c9f977462cdd38b066a","url":"wasm/koder.js"},{"revision":"6f11e7db4fe9aca82cac7150bfc33769","url":"wasm/zbar.js"},{"revision":"e8789bf03df9c2c85e9c59ab0a0cd0c6","url":"wasm/zbar.wasm"},{"revision":"e59090fe1e4626062b98f969ced5aaf4","url":"wasmWorker.js"}]);
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