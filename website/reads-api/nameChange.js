document.addEventListener("DOMContentLoaded", function() {
    // Define the CSS code
    var cssCode = `
        <style>
            .remove-button {
                color: red;
                font-weight: bold;
                cursor: pointer;
            }
        </style>
    `;
    
    // Define the HTML code
    var htmlCode = `
        <div id="nameInput">
            <input type="text" id="nameField" placeholder="Enter your name">
            <button onclick="setName()">Set Name</button>
        </div>
        <div id="nameDisplay" style="display: none;">
            <p><strong>Your name:</strong> <span id="nameValue"></span> <span class="remove-button" onclick="removeName()">Remove</span></p>
        </div>
        <br>
    `;

    // Get the element with ID "nameChange"
    var nameChangeDiv = document.getElementById("nameChange");

    // Insert CSS code into the "nameChange" div
    nameChangeDiv.insertAdjacentHTML("beforeend", cssCode);

    // Insert HTML code into the "nameChange" div
    nameChangeDiv.insertAdjacentHTML("beforeend", htmlCode);
});

// Function to set the "name" cookie for the entire website
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/;`;
}

// Function to get cookie value by name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to set the name
function setName() {
    var nameInput = document.getElementById("nameField").value.trim();
    if (nameInput !== "") {
        setCookie("name", nameInput);
        window.location.reload(); // Reload the page
    }
}

// Function to display the stored name
function displayStoredName() {
    var storedName = getCookie("name");
    if (storedName) {
        var nameDisplayDiv = document.getElementById("nameDisplay");
        var nameValueSpan = document.getElementById("nameValue");
        nameValueSpan.textContent = storedName;
        nameDisplayDiv.style.display = "block";
        document.getElementById("nameInput").style.display = "none";
    }
}

// Function to remove the stored name
function removeName() {
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(); // Reload the page
}

// Check if the name cookie exists on page load
window.onload = function() {
    displayStoredName();
};