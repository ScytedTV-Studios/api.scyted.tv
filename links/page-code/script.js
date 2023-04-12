// Username
const username = "@loydosborne"

// Background Colours
const bodybgcolour = "#000000"
const pfpbgcolour = "#CCC"

// Font (Google)
const googlefont = "Rubik"

// Text Colours
const boldtextcolour = "#FFEA00"
const normaltextcolour = "#FFFFFF"

// Box Colours
const boxcolour = "#191919"
const boxhovercolour = "#2a2a2a"

function addStyle(styleString) {
    const style = document.createElement("style");
    style.textContent = styleString;
    document.head.append(style);
}

addStyle(`
    :root {
      --profilepic: url("https://api.scyted.tv/links/users/${username}/profile-picture.png");
      --bodybgcolour: ${bodybgcolour};
      --pfpbgcolour: ${pfpbgcolour};
      --googlefont: ${googlefont};
      --boldtextcolour: ${boldtextcolour};
      --normaltextcolour: ${normaltextcolour};
      --boxcolour: ${boxcolour};
      --boxhovercolour: ${boxhovercolour};
    }
  `);

window.addEventListener('load', () => {
    const url = `https://api.scyted.tv/links/users/${username}/user-info.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            const displayDiv = document.getElementById('displaytitle');
            displayDiv.innerHTML = '';
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const name = item.name;
                const description = item.description;
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<h1>${name}</h1><p>${description}</p> `;
                displayDiv.appendChild(itemDiv);
            }
        })
        .catch(error => console.error(error));
});

window.addEventListener('load', () => {
    const url = `https://api.scyted.tv/links/users/${username}/links.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            const displayDiv = document.getElementById('displaylinks');
            displayDiv.innerHTML = '';
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const name = item.name;
                const link = item.link;
                const itemDiv = document.createElement('a');
                itemDiv.innerHTML = `

            <div class="links">
            <a href="${link}" class="link-box" target="_blank">
              <div class="link-icon"><i class="fa fa-github"></i></div>
              <div id="displaylinkstitle"></div>
              <h2>${name}</h2>
            </a>
            </div>

            `;
                displayDiv.appendChild(itemDiv);
            }
        })
        .catch(error => console.error(error));
});

