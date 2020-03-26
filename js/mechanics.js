// Notes to keep in mind
    // TAKE OUT ANY "amp;" REFERENCES IN URL'S. THERE MAY BE MORE THAN ONE.
    // data.children[X].data.preview.images[0].source.url
    // data.children[X].data.post_hint (to check if picture)
    // http://www.reddit.com/search.json?q=X+nsfw:no+Y
// OKAY SO APPARENTLY THERE IS A URL PROPERTY THAT I MISSED

// GLOBALS
// Search Strings
const redditFetchRequestDefault = "http://www.reddit.com/search.json?q=nsfw:no"

// HTML References
let searchScreen = document.getElementById("searchScreen")
let slideShowScreen = document.getElementById("slideShowScreen")
let queryText = document.getElementById("queryText")
let submitButton = document.getElementById("submitButton")
let currentImage = document.getElementById("currentImage")
let stopShowButton = document.getElementById("stopShowButton")

// Other Globals
let slideShowTimer
let imageLocations = []
let imageCounter = 0;
let redditQuery

// Primary call function
const beginSlideShow = (e) => {
    e.preventDefault()
    compileSearchTerms()

    fetch(redditQuery)
    .then((response) => {return response.json()})
    .then((data) => {
        compileURLS(data.data.children)
        if (imageLocations.length != 0) {
            nextSlide()
            showSlideShowSCreen()
            slideShowTimer = setInterval(nextSlide, 2000)
        }
    })
    .catch((error) => {console.log("Error occured:", error)})
}

// Add the search terms to the reddit query
const compileSearchTerms = () => {
    console.log("Condensing the search terms...")
    let searchTerms = queryText.value.split(/[\s,]+/) // Create an array of search terms, removing spaces and commas
    redditQuery = redditFetchRequestDefault // Reset the query to the default
    searchTerms.forEach((term) => {redditQuery += ("+" + term)}) // Add each search term to the query
    console.log("The reddit query is:",redditQuery)
}

// Compile the URL's of image objects
const compileURLS = (children) => {
    console.log("Pulling the URL's out...")
    imageLocations = []
    console.log("There are",children.length,"children")
    children.forEach(child => {
        if(child.data.post_hint === "image") {
            imageLocations.push(child.data.url)
        }
    })
    console.log("The URL's to present:", imageLocations)
}

// Creates elements for all the images 
const addImages = () => {
    for (i=0; i<imageLocations.length; i++) {
        var image = document.createElement("img")
        image.setAttribute("id", i)
        image.setAttribute("opacity", "0")
        image.src = imageLocations[i]
    }
}

// Displays the next slide
const nextSlide = () => {
    console.log("Starting next slide")
    if (imageCounter >= imageLocations.length) { imageCounter = 0 } // If you're at the end, go back to the beginning
    // Trigger the animation from current slide to next slide
    currentImage.src = imageLocations[imageCounter] // Change the source of the current image
    imageCounter++
}

// End the show and return to search
const endSlideShow = (e) => {
    e.preventDefault()
    showSearchScreen()
    clearInterval(slideShowTimer)
    imageCounter=0;
}

// Display the search screen and hide the slide show
const showSearchScreen = () => {
    searchScreen.style.display = "block"
    slideShowScreen.style.display = "none"
}
// Display the slide show and hide the search screen
const showSlideShowSCreen = () => {
    searchScreen.style.display = "none"
    slideShowScreen.style.display = "block"
}

// Initialization functions
showSearchScreen()
submitButton.addEventListener("click", beginSlideShow)
stopShowButton.addEventListener("click", endSlideShow)