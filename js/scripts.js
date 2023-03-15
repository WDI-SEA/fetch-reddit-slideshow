// DOM Selectors
const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingMessage = document.querySelector("#loading-message");
const imgSlide = document.querySelector("#imageSlide");
const stopButton = document.querySelector("#stop-button");

// Reddit API URL
const redditURL = "http://www.reddit.com/search.json";

// Array to keep images
let imageUrls = [];

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
    let currentIndex = 0;
    // Set initial image source
    imgSlide.src = imageUrls[currentIndex];
    // Interval to cycle through images
    const intervalId = setInterval(() => {
        currentIndex++;
        // Reset to beginning of array if at end
        if (currentIndex === imageUrls.length) {
            currentIndex = 0;
        }
        // Update image source with current index
        imgSlide.src = imageUrls[currentIndex];
    }, 2000);
    // Save interval ID to stop later
    myInterval = intervalId;
}

// Stop button event listener - stop slideshow
stopButton.addEventListener("click", stopSlideShow);

// Function to stop slideshow
function stopSlideShow() {
    clearInterval(myInterval);
}
