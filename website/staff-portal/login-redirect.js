document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to get the base URL
    function getBaseUrl() {
        const url = window.location.origin;
        return url;
    }

    // Function to get the current page URL
    function getCurrentPageUrl() {
        return window.location.href;
    }

    // Check if the accessToken cookie is present
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        // If accessToken is not found, redirect to the OAuth URL
        const baseUrl = getBaseUrl();
        const currentPageUrl = encodeURIComponent(getCurrentPageUrl());
        const redirectUrl = `${baseUrl}/oauth/discord?callbackUrl=${currentPageUrl}`;
        window.location.href = redirectUrl;
    }
});