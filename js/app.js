const requestURL = 'https://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', () => {
    // fetch related posts from reddit (with fetch)
    searchForm.addEventListener('submit', (e) => {
        // prevent default form submission 
        e.preventDefault()
        fetch(requestURL + search.value)
        .then((responseData) => {
            // verify that you can type something into the form
            // use AJAX to make a request. Show data in console
            console.log(responseData)
            return responseData.json()
        })
        .then((jsonData) => {
            console.log('here is the json data\n', jsonData)
            // take jsonDATA and create an array of image URLs (use map and filter)
            const resultsArr = jsonData.data.children
            const onlyURLs = resultsArr.map(getURLs = (list) => {
                return list.data.url
            })
            const getImg = onlyURLs.filter(redditImg = (url) => {
                return url.includes('https://i.redd.it/')
            })
        })
        .catch((error) => {
            console.log(`there's been an error!\n,`, error)
        })
    })
})

// Make the form / title / description hide
// Cycle through images
// tip: use setInterval
// Either add images, or change the src of a single image tag
// Add some interesting style / animation
// Create button to stop animation (tip: use clearInterval).

// When the user enters a search term and presses enter
// The form / title / description should hide
// Show a loading message (optional)
// Display animation / slideshow of images (with DOM manipulation)
// Show a button to stop slideshow
// Repeat animation until user clicks "stop", then redisplay the original form/title/description
// When the user clicks the "stop" button
// Animation stops / images are removed
// Form / title / description are shown again
// User can enter a new search term