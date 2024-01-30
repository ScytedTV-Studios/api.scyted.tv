document.addEventListener("DOMContentLoaded", function () {
    // Load the navigation bar template
    fetch("https://api.scyted.tv/wave-development/navbar.html")
        .then(response => response.text())
        .then(navbarHtml => {
            const navbarContainer = document.getElementById('navbar-container');
            navbarContainer.innerHTML = navbarHtml;

            // Include the JavaScript code for the navigation bar
            const navbarScript = document.createElement('script');
            navbarScript.src = 'https://api.scyted.tv/wave-development/navbar.js';
            document.body.appendChild(navbarScript);
        })
        .catch(error => console.error("Error loading navbar:", error));
});