// Create and append styles to the head
var style = document.createElement('style');
style.innerHTML = `
/* Hide resource-container and banner on mobile devices */
@media only screen and (max-width: 768px) {

    .resource-container,
    .banner {
        display: none;
    }
}

/* Show mobile-error on mobile devices */
@media only screen and (max-width: 768px) {
    .mobile-error {
        display: block;
        /* or any other desired display property */
    }
}
    `;
document.head.appendChild(style);

// Create loading screen div
var mobileError = document.createElement('div');
mobileError.id = 'mobile-error';
mobileError.class = 'mobile-error';
mobileError.innerHTML = `<div id="error-message" style="color: red;">ScytedTV Resources isn't currently available to mobile users at this time.</div>`;
document.body.appendChild(mobileError);