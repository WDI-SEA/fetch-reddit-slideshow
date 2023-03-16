// DOM Selectors
const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingMessage = document.querySelector("#loading-message");
const imgSlide = document.querySelector("#imageSlide");
const stopButton = document.querySelector("#stop-button");

// define myInterval
let myInterval

// Reddit API URL
const redditURL = "http://www.reddit.com/search.json";

// Array to keep images
let imageUrls = [];
let imageIndex = 0

// Submit form event listener - fetch images from Reddit API and start slideshow
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  input.value = "";
  fetch(`${redditURL}?q=${inputValue}+nsfw:no`)
    .then((response) => response.json())
    .then(data => {
        // Filter out non-image URLs and add to imageUrls array
        for(let i=0; i < data.data.children.length; i++) {
            const url = data.data.children[i].data.url;
            if (url.endsWith('.jpg') || url.endsWith('.png')) {
                imageUrls.push(url);
            }
        }
        // Start slideshow with imageUrls array
        startSlideShow();
    })
    .catch(console.warn)
});


// Function to start slideshow
function startSlideShow() {
    myInterval = setInterval(nextSlide, 2000)
}

function nextSlide() {
    if (imageIndex >= imageUrls.length) {
        imageIndex = 0
    }
    imgSlide.src = imageUrls[imageIndex]
    imageIndex++
}

// Function to stop slideshow
function stopSlideShow() {
    clearInterval(myInterval);
}

// Stop button event listener - stop slideshow
stopButton.addEventListener("click", stopSlideShow)  
