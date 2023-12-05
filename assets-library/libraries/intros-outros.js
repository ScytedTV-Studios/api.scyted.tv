document.addEventListener('DOMContentLoaded', function () {
    fetch('catalogItems.json')
        .then(response => response.json())
        .then(data => generateCatalog(data.items))
        .catch(error => console.error('Error fetching JSON:', error));

    function generateCatalog(items) {
        const catalogSection = document.getElementById('catalogSection');

        items.forEach(item => {
            const catalogItem = document.createElement('div');
            catalogItem.innerHTML = `
                <div class="preview">
                    ${generatePreview(item.fileLink, item.fileName)}
                </div>
                <div class="file-details">
                    <h2>${item.fileName}</h2>
                    <a href="${item.fileDownloadLink}" class="download-btn" download>Download</a>
                </div>
            `;
            catalogSection.appendChild(catalogItem);
        });
    }

    function generatePreview(fileLink, fileName) {
        const fileExtension = getFileExtension(fileName.toLowerCase());

        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
            return `<img src="${fileLink}" alt="${fileName}">`;
        } else if (fileExtension === 'mp4' || fileExtension === 'webm') {
            return `<video controls>
                        <source src="${fileLink}" type="video/${fileExtension}">
                        Your browser does not support the video tag.
                    </video>`;
        } else if (fileExtension === 'mp3' || fileExtension === 'ogg' || fileExtension === 'wav') {
            return `<audio controls>
                        <source src="${fileLink}" type="audio/${fileExtension}">
                        Your browser does not support the audio tag.
                    </audio>`;
        } else {
            return `<p>Preview not available</p>`;
        }
    }

    function getFileExtension(fileName) {
        return fileName.split('.').pop();
    }
});