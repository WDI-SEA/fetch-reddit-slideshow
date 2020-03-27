// Declare global variable and constants
const API_URL_BASE = 'http://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 3000
let currentImages = []
let currentIndex = 0
let interval = null
let h3 = document.createElement('h3')
// Declare some event handlers
// Form submit
document.getElementById('search-form').addEventListener('submit', (e) => {
    // Prevent the form's behavior of refreshing the page
    e.preventDefault()
    
    // Grab the user's query
    let userQuery = document.getElementById('query').value
    // Make sure the user actually typed something
    if (userQuery) {
        // Good query, so perform the search
        fetchReddit(userQuery)
        logoUp()
    }
    else {
        console.log('Um, please type something')
    }
})
//function to make reddit logo go down & up
const logoDown = () => {
    document.getElementById('header').style.paddingTop = '35vh'
}
const logoUp = () => {
    document.getElementById('header').style.paddingTop = '1vh'

}

const startSearch = () => {
    logoDown()
    // Show the search bar
    document.getElementById('search-box').style.display = 'inline-block'
    //stop the interval 
    clearInterval(interval)
    // Hide the slideshow div
    document.getElementById('slideshow').style.display = 'none'
    //clear the search input field
    document.getElementById('query').value = ''
    //reset curretIndex
    currentIndex = 0;
}
//stop button event handler
document.getElementById('stop-button').addEventListener('click', startSearch)

// Helper functions
// The fetch function
const fetchReddit = (userQuery) => {
    console.log('You will search reddit for', userQuery)
    // Call the reddit API using the fetch function
    // Equivalent to the first then() statement:
    // .then((response) => {
    //     return response.json()
    // })
    fetch(API_URL_BASE + userQuery)
        .then(response => response.json())
        .then(jsonData => {
            // This is the data, here is where we do stuff with it!
            let results = jsonData.data.children.filter((item) => {
                return item.data.post_hint == 'image'
            }).map((item) => {
                return {
                    title: item.data.title,
                    url: item.data.url,
                    subreddit: item.data.subreddit,
                    upvotes: item.data.ups,
                    downvotes: item.data.downs,
                    gold: item.data.gilded > 0
                }
            })
            //assign results back to global variable for accessing everywhere
            currentImages = results
            console.log('this is your array of current images:' + currentImages)
            startSlideshow()
        })
        .catch(err => {
            // This only happens if something broke
            console.log('ERROR', err)
        })
}
// Start the slideshow
const startSlideshow = () => {
    // Hide the search bar
    document.getElementById('search-box').style.display = 'none'
    // Show the slideshow div
    document.getElementById('slideshow').style.display = 'block'
    // Display the first image
    displayCurrent()
    // Kick off the interval
    interval = setInterval(displayNext, 3000)
}
// Display current image
const displayCurrent = () => {
    // Create an image tag
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    // Create an H3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].title
    // Place my newly created elements into the DOM
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
    currentIndex++
}
// Updates the next image
const displayNext = () => {
    if (currentIndex < currentImages.length) {
        // Empty previous images
        document.getElementById('results').innerHTML = ""
        displayCurrent()
        console.log('current index' + currentIndex)
    } else {
        logoDown()
        document.getElementById('look').textContent = "So sad, we ran out of pictures!"
        document.getElementById('results').innerHTML = ""
        document.getElementById('stop-button').remove()
        //stop the interval 
        clearInterval(interval)
        restartSearch()


    }
}
const restartSearch = () => {
    //create a button to restart search
    let tryAgain = document.createElement('button')
    tryAgain.setAttribute('id', 'tryBtn')
    tryAgain.innerHTML = 'Search again!'
    document.getElementById('slideshow').append(tryAgain)
    logoDown()
    //append event listener to try again search button
    document.getElementById('tryBtn').addEventListener('click', startSearch)
    
}

