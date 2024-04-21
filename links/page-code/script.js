// Important Consts
// const username = "@loydosborne"
const theme = "stv/default"

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
                // const username = item.username;
                // const theme = item.theme;
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

window.addEventListener('load', () => {
    const url = `https://api.scyted.tv/links/users/${username}/user-info.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            const displayDiv = document.getElementById('pagetitle');
            displayDiv.innerHTML = '';
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const name = item.name;
                const theme = item.theme;
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<title>${name}</title>`;
                displayDiv.appendChild(itemDiv);
            }
        })
        .catch(error => console.error(error));
});

////////////////
//   THEMES   //
////////////////

// window.addEventListener('load', () => {
//     const url = `https://api.scyted.tv/links/users/${username}/user-info.json`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const items = data.items;
//             const displayDiv = document.getElementById('pagetitle');
//             displayDiv.innerHTML = '';
//             for (let i = 0; i < items.length; i++) {
//                 const item = items[i];
//                 // const theme = item.theme;
//                 const theme = "stv/default"

//                 window.addEventListener('load', () => {

//                     const url = `https://api.scyted.tv/links/themes/${theme}.json`;
//                     fetch(url)
//                         .then(response => response.json())
//                         .then(data => {
//                             const items = data.items;
//                             for (let i = 0; i < items.length; i++) {
//                                 const item = items[i];

//                                 const bodybgcolour = item.bodybgcolour;
//                                 const pfpbgcolour = item.pfpbgcolour;
//                                 const googlefont = item.googlefont;
//                                 const googlefontlink = item.googlefontlink;
//                                 const boldtextcolour = item.boldtextcolour;
//                                 const normaltextcolour = item.normaltextcolour;
//                                 const boxcolour = item.boxcolour;
//                                 const boxhovercolour = item.boxhovercolour;

//                                 function addStyle(styleString) {
//                                     const style = document.createElement("style");
//                                     style.textContent = styleString;
//                                     document.head.append(style);
//                                 }

//                                 addStyle(`
//                                     :root {
//                                       --profilepic: url("https://cdn.scyted.tv/links/profile-picture/${username}.png");
//                                       --bodybgcolour: ${bodybgcolour};
//                                       --pfpbgcolour: ${pfpbgcolour};
//                                       --googlefont: ${googlefont};
//                                       --googlefontlink: ${googlefontlink};
//                                       --boldtextcolour: ${boldtextcolour};
//                                       --normaltextcolour: ${normaltextcolour};
//                                       --boxcolour: ${boxcolour};
//                                       --boxhovercolour: ${boxhovercolour};
//                                     }
//                                   `);

//                             }
//                         })
//                         .catch(error => console.error(error));
//                 });

//             }
//         })
//         .catch(error => console.error(error));
// });

window.addEventListener('load', () => {

    const url = `https://api.scyted.tv/links/themes/${theme}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                const bodybgcolour = item.bodybgcolour;
                const pfpbgcolour = item.pfpbgcolour;
                const googlefont = item.googlefont;
                const googlefontlink = item.googlefontlink;
                const boldtextcolour = item.boldtextcolour;
                const normaltextcolour = item.normaltextcolour;
                const boxcolour = item.boxcolour;
                const boxhovercolour = item.boxhovercolour;

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
                      --googlefontlink: ${googlefontlink};
                      --boldtextcolour: ${boldtextcolour};
                      --normaltextcolour: ${normaltextcolour};
                      --boxcolour: ${boxcolour};
                      --boxhovercolour: ${boxhovercolour};
                    }
                  `);

            }
        })
        .catch(error => console.error(error));
});

window.addEventListener('load', () => {
    const url = `https://api.scyted.tv/links/themes/${theme}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            const displayDiv = document.getElementById('gfontlink');
            displayDiv.innerHTML = '';
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const googlefontlink = item.googlefontlink;
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<link href="${googlefontlink}" rel="stylesheet">`;
                displayDiv.appendChild(itemDiv);
            }
        })
        .catch(error => console.error(error));
});