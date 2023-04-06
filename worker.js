const version = "12";

const app_files = [
	"./",
	"index.html",
	"app.js",
	"style.css",
	"favicon.ico",
	"favicon.png",
	"apple-touch-icon.png",
	"manifest.webmanifest"
];

self.addEventListener("install", (e) => {
	e.waitUntil(
		(async () => {
			const cache = await caches.open("app_cache-v" + version);
			await cache.addAll(app_files);
		})()
	);
});

self.addEventListener("fetch", (e) => {
	e.respondWith(
		(async () => {
			const r = await caches.match(e.request);
			if (r) {
				return r;
			}
			const response = await fetch(e.request);
			const cache = await caches.open("app_cache-v" + version);
			cache.put(e.request, response.clone());
			return response;
		})()
	);
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key === "app_cache-v" + version) {
						return;
					}
					return caches.delete(key);
				})
			);
		})
	);
});