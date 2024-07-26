document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to delete a cookie by name
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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

    // Function to get user ID from access token
    async function getUserID(accessToken) {
        const response = await fetch('https://discord.com/api/v9/users/@me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const userData = await response.json();
            return userData.id;
        }
        return null;
    }

    // Function to fetch JSON data
    async function fetchJSON(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
        return null;
    }

    // Function to check if the user has any roles
    async function checkUserRoles(accessToken) {
        const userId = await getUserID(accessToken);
        if (!userId) return false;

        const userInfo = await fetchJSON('https://api.scyted.tv/website/staff-portal/user-info.json');
        return userInfo && userInfo[userId] && userInfo[userId].length > 0;
    }

    // Check if the accessToken cookie is present
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
        // If accessToken is not found, redirect to the OAuth URL
        const baseUrl = getBaseUrl();
        const currentPageUrl = encodeURIComponent(getCurrentPageUrl());
        const redirectUrl = `${baseUrl}/oauth/discord?callbackUrl=${currentPageUrl}`;
        window.location.href = redirectUrl;
    } else {
        // Check if the user has roles
        checkUserRoles(accessToken).then(hasRoles => {
            if (!hasRoles) {
                // Delete the accessToken cookie and redirect to the error URL
                deleteCookie('accessToken');
                window.location.href = 'https://auth.scyted.tv/staff.scyted.tv/discord?error=invalidAccess';
            }
        }).catch(() => {
            // Handle errors, such as network issues or fetch failures
            deleteCookie('accessToken');
            window.location.href = 'https://auth.scyted.tv/staff.scyted.tv/discord?error=invalidAccess';
        });
    }
});
