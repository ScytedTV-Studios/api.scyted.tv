// Create and append styles to the head
var style = document.createElement('style');
style.innerHTML = `
.mobile-error {
    display: none;
}

@media only screen and (max-width: 768px) {

    .resource-container,
    .banner {
        display: none;
    }

    .mobile-error {
        display: block;
    }

}
    `;
document.head.appendChild(style);

// Create loading screen div
var mobileError = document.createElement('div');
mobileError.id = 'mobile-error';
mobileError.class = 'mobile-error';
mobileError.innerHTML = `<body><div id="error-message" style="color: red;">ScytedTV Resources isn't currently available to mobile users at this time.</div></body>`;
document.body.appendChild(mobileError);