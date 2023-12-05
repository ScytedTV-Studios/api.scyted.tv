document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON file
    fetch('folders.json')
        .then(response => response.json())
        .then(data => generateFolders(data.folders))
        .catch(error => console.error('Error fetching JSON:', error));

    function generateFolders(folders) {
        const foldersSection = document.getElementById('foldersSection');

        folders.forEach(folder => {
            const folderElement = document.createElement('section');
            folderElement.innerHTML = `
                <ul>
                    <li>● <a href="${folder.location}">${folder.name}</a></li>
                </ul>
            `;
            foldersSection.appendChild(folderElement);
        });
    }
});