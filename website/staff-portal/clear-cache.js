document.addEventListener("DOMContentLoaded", function() {
    // Clear the browser's cache by reloading the page without using cache
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        }).catch(function(error) {
            console.error("ServiceWorker registration failed: ", error);
        });
    }

    fetch(window.location.href, { cache: "reload" })
        .then(response => {
            if (response.status === 200) {
                console.log("Cache cleared and page reloaded");
            }
        })
        .catch(error => {
            console.error("Error reloading page: ", error);
        });
});