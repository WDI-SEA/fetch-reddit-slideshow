// http://www.reddit.com/search.json?q=cats+nsfw:no&limit=100

// APP STATE
// ms speed of interval 
const TIMER_SPEED = 1000
// interval for the slideshow
let slideshowInterval = null
// current image index
let imageIndex = -1
// an array of images to display
let images = []

// DOM ELEMENTS
let titleHeader, description, searchForm, inputBox, stopButton, slideshowContainer, verticalLine
// FUNCTIONS
// invokes on form submit and fetches reddit
function fetchReddit(e) {
    e.preventDefault()
    inputBox.value = 'chonkers'
    if (!inputBox.value) return inputBox.placeholder = 'type something in!'
    const searchUrl = `http://www.reddit.com/search.json?q=${inputBox.value}+nsfw:no&limit=100`
    fetch(searchUrl)
        .then(response => response.json())
        .then(redditJson => {
            images = redditJson.data.children.map(child => {
                return {
                    url: child.data.url,
                    sub: child.data.subreddit,
                    author: child.data.author
                }
            })
            .filter(child => child.url.slice(-4) === '.jpg' || child.url.slice(-4) === '.png')
            //start the slideshow
             // hide everyhting on screen
             titleHeader.style.display == 'none'
             description.style.display == 'none'
             searchForm.style.display == 'none'
             verticalLine.style.display == 'none'

             //show the stop button
             stopButton.style.display = 'inline'
             slideshowContainer.style.display = 'block'
             slideshowInterval = setInterval(changeSlide, TIMER_SPEED)
        })
        .catch()
}

function changeSlide(){
    imageIndex++
    if (imageIndex >= images.length) imageIndex = 0

    while (slideshowContainer.firstChild) {
        slideshowContainer.removeChild(slideshowContainer.firstChild)
    }

    const image = document.createElement('img')
    image.src = images[imageIndex].url
    image.alt = 'image fetched from reddit'

    const author = document.createElement('h4')
    author.innerText = image[imageIndex].author

    const sub = document.createElement('p')
    sub.innerText = images[imageIndex].sub

    slideshowContainer.appendChild(image, author, sub)

}

function stopSlideshow() {
    stopButton.style.display = 'none'
}


// DOM CONTENT LOAD INITIALIZER
document.addEventListener("DOMContentLoaded", ()=>{
    titleHeader = document.querySelector('#title-header')
    description = document.querySelector('#description')
    searchForm = document.querySelector('#search-form')
    inputBox = document.querySelector('#inputBox')
    stopButton = document.querySelector('#stop-button')
    slideshowContainer = document.querySelector('#slideshow-container')
    verticalLine = document.querySelector('.vl')
    // console.log(titleHeader, description, searchForm, inputBox, stopButton, slideshowContainer)
    // listen for submits
    searchForm.addEventListener('submit', fetchReddit)
    // listen for clicks on stop button
    stopButton.addEventListener('click', stopSlideshow)
    // show the stop button and slideshow div
    stopButton.style.display = 'inline'
    slideshowContainer.style.display = 'none'

})

