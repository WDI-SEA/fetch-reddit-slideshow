// -------- APP STATE ---------------------------

const TIMER_SPEED = 1000
// variable for our interval
let slideshowInterval = null
// container for the images
let images = []
// index of the current image being shown
let imageIndex = 0

// -------- DOM SELECTORS -----------------------

const SEARCH_FORM = document.querySelector("#search-form")
const SEARCH_INPUT = document.querySelector("#search-input")
const SUBMIT_BUTTON = document.querySelector("#submit-button")
const STOP_BUTTON = document.querySelector("#stop-button")
const SLIDESHOW_CONTAINER = document.querySelector("#slideshow-container")

SEARCH_FORM.addEventListener("submit", fetchReddit)
STOP_BUTTON.addEventListener("click", stopSlideShow)
STOP_BUTTON.style.display = "none"

// -------- FUNCTIONS ---------------------------

function fetchReddit(e) {
    e.preventDefault()
    fetch(`https://www.reddit.com/search.json?q=${SEARCH_INPUT.value}+nsfw:no`)
        .then(res => res.json()) // implicit return (with one param)
        .then((jsonData) => {
            console.log(jsonData)
            images = jsonData.data.children
            .map(child => {
                return {
                    url: child.data.url,
                    subreddit: child.data.subreddit,
                    author: child.data.author
                }
            })
            .filter(image => {
                const fileExtension = image.url.slice(-4)
                if(fileExtension === ".jpg" || fileExtension === ".png") return true
                return false
            })
        // console.log(images)
        // set the interval for the slideshow
        slideshowInterval = setInterval(changeSlide, TIMER_SPEED)
        STOP_BUTTON.style.display = "inline"
        // invoke the slideshow callback one time
        changeSlide()

        })
        .catch(err => console.log(err))
}

// callback function for the interval
function changeSlide() {
    // increment the slideshow index
    imageIndex++
    // reset the image index if it's out of bounds
    if(imageIndex >= images.length) imageIndex = 0
    // console.log(images[imageIndex])
    // first empty out the div of any elements
    while (SLIDESHOW_CONTAINER.firstChild) {
        SLIDESHOW_CONTAINER.removeChild(SLIDESHOW_CONTAINER.firstChild)
    }
    // update the DOM
    const imageSlide = document.createElement("img")
    imageSlide.src = images[imageIndex].url
    imageSlide.alt = images[imageIndex].author
    imageSlide.width = "400"

    SLIDESHOW_CONTAINER.appendChild(imageSlide)

}

function stopSlideShow() {
    // stop the madness
}



// DEFECTIVES & NOTES

// --> Alternate implicit-return version of second .then statement
// .then(jsonData => console.log(jsonData))

// --> Returns a directory of all values within a JS object.
// console.dir(SEARCH_INPUT)

// --> Returns a Boolean based on whether the object is or isn't an array.
// console.log(Array.isArray(jsonData.data.children))
