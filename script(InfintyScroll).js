const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//Unsplash API
const count = 30;
const apiKey = 'iyJInr_zV6-QgePtc1S_C9cJElVZkvJVaRnRfnRFNmg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true; 
        loader.hidden =  true;
        console.log('ready =', ready);
        
    }
}

// To set the setAttribute, (Helper function to set Attribute in DOM element)
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Element for links & photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run Function for each object in photosArray
    photoArray.forEach((photo) => {
        // Create <a> to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Add eventListner, when each is finish loading
        img.addEventListener('load', imageLoaded);

        // Put <img> into <a>, then Put both into imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();

    } catch (error) {
        //Catch error Here
    }
}

// Check to scrolling near bottom of page , Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&ready) {
        ready = false;
        getPhotos();

    }
});

//On Load 
getPhotos();