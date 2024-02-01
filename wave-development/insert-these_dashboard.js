function insertIntoHead(content) {
    const head = document.head || document.getElementsByTagName('head')[0];
    head.innerHTML += content;
  }
  
  function insertIntoBody(content) {
    document.body.innerHTML += content;
  }
  
  window.onload = function() {

    insertIntoHead('<link rel="stylesheet" href="https://api.scyted.tv/wave-development/scrollbar-styles.css">');
  
    insertIntoBody('<script src="https://api.scyted.tv/wave-development/dashboard/page-loading-script.js"></script>');

  };