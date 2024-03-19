// Function to check if the user is on a mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Function to redirect URLs based on device type
function redirectBasedOnDevice() {
    var currentPageURL = window.location.href;
    var baseUrl = window.location.origin;

    // Check if the user is on mobile
    if (isMobileDevice()) {
        // If the URL doesn't already contain '/m', add '/m' after the base URL
        if (!currentPageURL.includes(baseUrl + "/m")) {
            var newURL = currentPageURL.replace(baseUrl, baseUrl + "/m");
            window.location.href = newURL;
        }
    } else { // User is on desktop
        // If the URL contains '/m', remove it
        if (currentPageURL.includes(baseUrl + "/m")) {
            var newURL = currentPageURL.replace(baseUrl + "/m", baseUrl);
            window.location.href = newURL;
        }
    }
}

// Call the function to perform redirection based on device type
redirectBasedOnDevice();