document.addEventListener('DOMContentLoaded', function () {
    startAPP();
});

function startAPP() {
    createGallery();
}

function createGallery() {
    const gallery = document.querySelector('.gallery-images');

    for (let i = 1; i <= 12; i++) {
        const images = document.createElement('picture');
        images.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif"> 
        <source srcset="build/img/thumb/${i}.webp" type="image/webp"> 
        <img loading="lazy" widt="200" height="300" src="build/img/thumb/${i}.jpg" type=" Gallery image">
        `;

        images.onclick = function () {
            showImages(i);
        }

        gallery.appendChild(images);
    }
}

function showImages(id) {
    const images = document.createElement('picture');
    images.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif"> 
    <source srcset="build/img/grande/${id}.webp" type="image/webp"> 
    <img loading="lazy" widt="200" height="300" src="build/img/grande/${id}.jpg" type=" Gallery image">
    `;

    // Add Overlay with images
    const overlay = document.createElement('DIV');
    overlay.appendChild(images);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('pinup-body');
        overlay.remove();
    }


    // Add button to close images
    const closePicture = document.createElement('P');
    closePicture.textContent = 'X';
    closePicture.classList.add('close-btn');
    closePicture.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('pinup-body');
        overlay.remove();
    }
    overlay.appendChild(closePicture)

    // Add overlay to the HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('pinup-body')
}