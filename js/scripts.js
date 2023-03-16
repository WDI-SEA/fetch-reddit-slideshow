const searchWord = document.querySelector("#searchWord")
const keyword = searchWord.value
const startButton = document.querySelector("#startButton")
const redditUrl = `https://reddit.com/search/json?q=${keyword}+nsfw:no`
const images = []
let count = 0
let runSlideInterval = false

   
startButton.addEventListener("click", () => {
    console.log(keyword)

    startButton.addEventListener("click", () => {
        console.dir(keyword)

        fetch(redditUrl)
            .then(results => results.json())
            .then(console.log)
            .catch(console.warn)
    })

})




// When the user enters a search term and presses enter, the form / title / description should hide
    // Show a loading message (optional)
    // Fetch related posts from reddit (with fetch)
    // Display animation / slideshow of images (with DOM manipulation)
    // Show a button to stop slideshow
    // Repeat animation until user clicks "stop", then redisplay the original form/title/description
// When the user clicks the "stop" button
    // Animation stops / images are removed
    // Form / title / description are shown again
    // User can enter a new search term

// Suggested Process
    // Create your form (HTML/CSS)
    // Prevent default form submission and verify that you can type something into the form
    // Use fetch to make a request. Show data in console
    // Create an array of image URLs (tip: use filter and map).
    // Make the form / title / description hide
    // Cycle through images
        // tip: use setInterval
        // Either add images, or change the src of a single image tag
    // Add some interesting style / animation
    // Create button to stop animation (tip: use clearInterval).
