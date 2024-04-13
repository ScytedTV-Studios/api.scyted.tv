// List of JavaScript files to be loaded
var jsFiles = [
    'nameChange.js'
];

// Function to load JavaScript files dynamically
function loadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}

// Load each JavaScript file
jsFiles.forEach(function(file) {
    loadScript(file);
});
