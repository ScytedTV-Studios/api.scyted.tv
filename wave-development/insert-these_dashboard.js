// Function to insert content into the <head> section
function insertIntoHead(content) {
    const head = document.head || document.getElementsByTagName('head')[0];
    head.innerHTML += content;
  }
  
  // Function to insert content into the <body> section
  function insertIntoBody(content) {
    document.body.innerHTML += content;
  }
  
  // Example usage
  window.onload = function() {
    // Insert content into the <head> section
    insertIntoHead('<link rel="stylesheet" href="https://api.scyted.tv/wave-development/scrollbar-styles.css">');
  
    // Insert content into the <body> section
    insertIntoBody('<script src="https://api.scyted.tv/wave-development/dashboard/page-loading-script.js"></script>');
  };