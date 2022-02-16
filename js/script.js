// console.log('hello')

const searchPhase = document.getElementById('search-phase');
const slideshowPhase = document.getElementById('slideshow-phase');
const slideshowDiv = document.getElementById('slideshow');
const stopBtn = document.getElementById('stop-button');
let imagesArray = [];
let imgIndex = 0;
let slideInterval;

const fetchImages = () => {
    const searchValue = document.getElementById('search-input').value;
    fetch(`http://www.reddit.com/search.json?q=${searchValue}+nsfw:no`)
        .then((response) => response.json())
        .then((jsonData) => {
            const postArray = jsonData.data.children;
            // console.log(postArray)
            imagesArray = postArray.filter((el) => el.data.post_hint === 'image');
            // console.log(imagesArray)
            picsToDom(imagesArray[0].data.url);
            // picsToDom(jsonData.data.children[2].data.url)
        })
        .catch((err) => console.log('error fetching data:', err));
};

const picsToDom = (imgSrc) => {
    while (slideshowDiv.firstChild) {
        slideshowDiv.firstChild.remove();
    }
    searchPhase.style.display = 'none';
    slideshowPhase.style.display = 'block';
    const newPhoto = document.createElement('img');
    newPhoto.setAttribute('id', 'photo');
    newPhoto.src = imgSrc;
    slideshowDiv.appendChild(newPhoto);
    slideInterval = setInterval(start, 5000);
    setTimeout(() => {
        newPhoto.className = 'fade-out';
    }, 3000);
    setTimeout(() => {
        newPhoto.className = 'fade-in';
    }, 5000);
};

const start = () => {
    let currentImg = document.getElementById('photo');
    if (imgIndex < imagesArray.length - 1) {
        imgIndex++;
    } else imgIndex = 0;
    // console.log(currentImg.src)
    currentImg.src = imagesArray[imgIndex].data.url;
    setTimeout(() => {
        currentImg.className = 'fade-out';
    }, 3000);
    setTimeout(() => {
        currentImg.className = 'fade-in';
    }, 5000);
};

const backToSearch = () => {
    slideshowPhase.style.display = 'none';
    searchPhase.style.display = 'block';
    clearInterval(slideInterval);
};

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchImages();
    });
    stopBtn.addEventListener('click', backToSearch);
});
