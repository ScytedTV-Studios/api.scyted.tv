// Create and append styles to the head
var style = document.createElement('style');
style.innerHTML = `
      body {
        overflow-x: hidden;
        transition: margin 0.5s;
      }

      #loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: margin 0.5s;
      }

      #content {
        margin-left: 0;
        transition: margin 0.5s;
      }
    `;
document.head.appendChild(style);

// Create loading screen div
var loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.innerHTML = '<h1>Loading...</h1>';
document.body.appendChild(loadingScreen);

// Create content div
var contentDiv = document.createElement('div');
contentDiv.id = 'content';
document.body.appendChild(contentDiv);

// Function to handle element clicks with an href attribute
function handleElementClick(event) {
    if (event.target.getAttribute('href')) {
        event.preventDefault(); // Prevent the default link behavior

        // Slide in loading screen from the right
        loadingScreen.style.marginLeft = '0';
        setTimeout(function () {
            // Proceed to the link after a delay (simulating loading)
            window.location.href = event.target.href;
        }, 3000); // Change the delay to 0.5 seconds
    }
}

// Attach event listener to all elements with an href attribute
document.body.addEventListener('click', handleElementClick);

// Simulate a delay of 0.5 seconds for the initial loading screen
setTimeout(function () {
    loadingScreen.style.marginLeft = '-100%'; // Slide loading screen off to the left
    document.body.style.overflowX = 'visible'; // Show horizontal scrollbar
    contentDiv.style.marginLeft = '0'; // Adjust the desired margin value
}, 3000); // Change the delay to 0.5 seconds