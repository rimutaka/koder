if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.2/workbox-sw.js");
  if (workbox) {
    workbox.setConfig({debug: false});
    self.addEventListener("install", event => {
      self.skipWaiting();
    });
    workbox.precaching.precacheAndRoute([{"revision":"f98923403f5c78d689d56b18f947c520","url":"apple-touch-icon.png"},{"revision":"f762b455bf92fa601553fbe8c36bee80","url":"asset-manifest.json"},{"revision":"a62aa63bb4d0a3dd08820787bd7e118f","url":"favicon-16x16.png"},{"revision":"a5229a03fcfe584a3031846fe3c19ccf","url":"favicon-32x32.png"},{"revision":"4020571efe44dc33d271798e6a18e0c1","url":"favicon.ico"},{"revision":"74e855619c7afabf889aa987480b62f0","url":"index.html"},{"revision":"959bfdcf1e6c9af58607c14fa65c0d65","url":"logo.png"},{"revision":"8aaded5992279b76e9967f8708cc8e6a","url":"logo192.png"},{"revision":"337e46115678a33391984ce177ee5e3a","url":"manifest.json"},{"revision":"4e63fb323fbe896a8f499213d3a44235","url":"static/css/main.1f6102d8.css"},{"revision":"30f8d1c2c7ca0970bb7b37dba90fc734","url":"static/js/main.5db574cd.js"},{"revision":"c8b1481eb5c41b45e2a1e811f05e906a","url":"static/media/isbn_mod_bg.1c4e9a2f77f98b545302.wasm"},{"revision":"50415b83393c6251b500f4f9f8c5bc1f","url":"test.html"},{"revision":"24f2b115d3964c9f977462cdd38b066a","url":"wasm/koder.js"},{"revision":"6f11e7db4fe9aca82cac7150bfc33769","url":"wasm/zbar.js"},{"revision":"e8789bf03df9c2c85e9c59ab0a0cd0c6","url":"wasm/zbar.wasm"},{"revision":"e59090fe1e4626062b98f969ced5aaf4","url":"wasmWorker.js"}]);
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