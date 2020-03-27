// Declare global variable and constants
const API_URL_BASE = 'http://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2000
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
    }
    else {
        console.log('Um, please type something')
    }
})
// Stop button click
document.getElementById('stop-button').addEventListener('click', () => {
    console.log('STOP!!!')
    // Show the search bar
    document.getElementById('search-box').style.display = 'inline-block'
    //stop the interval 
    clearInterval(interval)
    // Hide the slideshow div
    document.getElementById('slideshow').style.display = 'none'
    //clear the search input fiedl
    document.getElementById('query').value = ''

})
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
            console.log(results)
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
    document.getElementById('slideshow').style.display = 'inline-block'
    // Display the first image
    displayCurrent()
    // Kick off the interval
    interval = setInterval(displayNext, 2000)
}
// Display current image
const displayCurrent = () => {
    // Create an image tag
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    img.setAttribute('id', 'img'+[currentIndex])

    // Create an H3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].title
    h3.setAttribute('id', 'h3'+[currentIndex])
    // Place my newly created elements into the DOM
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
}
// Updates the next image
const displayNext = () => {
    // Empty previous images
    document.getElementById('img'+[currentIndex]).remove()
    document.getElementById('h3'+[currentIndex]).remove()
    
    // Create an image tag
    let img = document.createElement('img')
    
    img.src = currentImages[currentIndex + 1].url
    img.alt = currentImages[currentIndex + 1].title
    img.setAttribute('id', 'img'+[currentIndex+1])
    // Create an H3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex + 1].title
    h3.setAttribute('id', 'h3'+[currentIndex+1])

    // Place my newly created elements into the DOM
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
    currentIndex++
}
