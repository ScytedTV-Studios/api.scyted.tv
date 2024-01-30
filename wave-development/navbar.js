function toggleUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    const storedAccessToken = getCookie("accessToken");

    // Redirect to login if access token is not found
    if (!storedAccessToken) {
        logout()
        window.location.href = "/login";
    } else {
        // Fetch user data from Discord API
        fetchDiscordUserData(storedAccessToken)
            .then(userData => {
                // Display bot info on the dashboard
                displayBotInfo();
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                // Handle error (e.g., redirect to login page)
                logout()
                window.location.href = "/login";
            });
    }
});

function fetchDiscordUserData(accessToken) {
    const apiUrl = 'https://discord.com/api/users/@me';

    return fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Discord API Request Failed! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(userData => {
            // Display user info on the dashboard
            displayUserInfo(userData);
        });
}

function displayUserInfo(userData) {
    const userDropdown = document.getElementById('userDropdown');
    const profilePicture = document.querySelector('.profile-picture');
    const username = document.querySelector('.user-info span');

    profilePicture.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    username.textContent = userData.username;
    userDropdown.querySelector('.home').href = `https://www.wavedev.app/`;
}

function logout() {
    // Clear cookies
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    window.location.href = "https://www.wavedev.app/";
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}