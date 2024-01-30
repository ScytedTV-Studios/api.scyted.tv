function toggleUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    const storedAccessToken = getCookie("accessToken");

    // Redirect to login if access token is not found
    if (!storedAccessToken) {
        logout()
        window.location.href = "https://www.wavedev.app/login";
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
                window.location.href = "https://www.wavedev.app/login";
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

function displayBotInfo() {
    const botInfoDiv = document.getElementById("botInfo");

    // Example data (replace with actual data)
    const botData = [
        { name: "Wave 24/7", profilePicture: "https://cdn.scyted.tv/discord-wave/wave.jpg", backgroundColor: "#9b72f9", link: "https://www.wavedev.app/dashboard/wave" },
        { name: "Levlr", profilePicture: "https://cdn.scyted.tv/discord-levlr/levlr.png", backgroundColor: "#9e3595", link: "https://www.wavedev.app/dashboard/levlr" },
        { name: "Heart Collectors", profilePicture: "https://cdn.scyted.tv/discord-heart-collectors/heart-collectors.png", backgroundColor: "#dc4437", link: "https://www.wavedev.app/dashboard/heart-collectors" },
    ];

    botData.forEach(bot => {
        const botContainer = document.createElement("a"); // Use an anchor element for the link
        botContainer.classList.add("bot-details");
        botContainer.style.backgroundColor = bot.backgroundColor || "#ddd"; // Set background color
        botContainer.href = bot.link || "#"; // Set link

        const botProfilePicture = document.createElement("img");
        botProfilePicture.src = bot.profilePicture;
        botProfilePicture.alt = "Bot Profile Picture";
        botProfilePicture.classList.add("bot-profile-picture");

        const botName = document.createElement("div");
        botName.classList.add("bot-name");
        botName.textContent = bot.name;

        botContainer.appendChild(botProfilePicture);
        botContainer.appendChild(botName);

        botContainer.addEventListener("click", function (event) {
            // Handle click on bot square (add your logic here)
            console.log(`Clicked on ${bot.name}`);
            // If you want to navigate to the link, remove the next line
            // event.preventDefault();
        });

        botInfoDiv.appendChild(botContainer);
    });
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