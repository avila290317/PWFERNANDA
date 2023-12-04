const nombreCache = "PWAPD"
const archivosChache=[
    "/",
    "/index.html",
    "/CSS/index.css",
    "/CV/curriculo.pdf",
    "/JS/app.js",
    "/JS/index.js",
    "/IMG_pd/icons",
    "/IMG_pd/SF.png",
    "/IMG_pd/contacto.jpg",
    "/IMG_pd/fondo.jpg",
    "/IMG_pd/p1.jpg",
    "/IMG_pd/p2.jpeg",
    "/IMG_pd/p3.jpeg",
    "/IMG_pd/p4.jpeg",
    "/IMG_pd/p5.jpeg",
    "/IMG_pd/p6.jpeg",
    "/IMG_pd/p8.jpg",
    "/IMG_pd/p9.jpg",
    "/IMG_pd/p10.jpg",
    "/IMG_pd/p11.jpeg",
    "/IMG_pd/prueba.jpg",
    "/IMG_pd/ubicacion.jpg",
    "/Fonts/Righteous/Righteous-Regular.ttf"
]

self.addEventListener('install', e => {
    console.log("El SW se instaló", e);
    e.waitUntil(
        caches.open(nombreCache)
        .then((cache) => {
            console.log();
            return cache.addAll(archivosCache);
        })
        .catch(error => {
            console.error('Error durante la instalación del caché:', error);
        })
    );
});

self.addEventListener('fetch', e => {
    console.log("Fetch...", e);
    e.respondWith(
        caches.match(e.request)
        .then(respuestaCache => {
            return respuestaCache || fetch(e.request)
                .then(respuestaRed => {
                    return caches.open(nombreCache)
                        .then(cache => {
                            cache.put(e.request, respuestaRed.clone());
                            return respuestaRed;
                        });
                })
                .catch(error => {
                    console.error('Error al intentar recuperar el recurso:', error);
                });
        })
    );
});

self.addEventListener('activate', e => {
    console.log("El SW está activo", e);
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== nombreCache) {
                    return caches.delete(key);
                }
            }));
        })
    );
});