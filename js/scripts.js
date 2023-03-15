// fetch with the input 

// use filter and map to only get images (array)
// make sure to just show the images

// cycle through images with setInterval

//.src and create new URL if possible



// DOM Selectors
const form = document.querySelector('form');
const input = document.querySelector('input')
const loadingMessage = document.querySelector('#loading-message')
const slideShow = document.querySelector('#slideshow')
const stopButton = document.querySelector('#stop-button')

// Reddit API URL
const redditURL =  'http://www.reddit.com/search.json'

// Array to keep images
let imageUrls = []

// submit form event listener - this should load pieces (loading message and clear input)
form.addEventListener('submit', (e) =>) {
    e.preventDefault();
    const inputValue = input.value;
    input.value = ''
    fetch(`${redditURL}?q=${inputValue}+nsfw:no`)
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none'
        loadingMessage.style.display = 'none'
        // something to add to my array - need to see API info
        // start slideshow
        // catch error
    })
}

// function for slideshow

// stop button - stop interval