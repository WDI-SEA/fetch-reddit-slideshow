// How do I get more than 25 results? My objects length is always 25, I can't get it to be more than 25.

const redditEndpointFirst = 'http://www.reddit.com/search.json?q=nsfw:no+'
const redditEndpointSecond = '&limit=100'
let imageURLs = []
let i = 0 // Index for iterating through imageURLs.

// imageInterval needs to be global so that I can 'pause' it from outside my 'start' function.
let imageInterval

// Figure out whether or not each search result has an image. This is where I'll need to find the exact path of my JSON objects.
const grabImageURL = (jsonObject) => {
    // jsonObject.data.children[].data.url_overridden_by_dest
    let title = jsonObject.data.title
    let subreddit = jsonObject.data.subreddit
    let url = jsonObject.data.url_overridden_by_dest

    if (url) { // Not all objects have this key value. For example, text posts don't have this attribute.
        if( url.includes('.png') || url.includes('.jpg') ) {
            imageURLs.push(url)
        }
    }
    // We can only start doing this once we have values in imageURLs.
    imageInterval = setInterval(changeImage, 3000) 
}

// Grab results
const grabResults = (searchTerm) => {
    fetch(redditEndpointFirst + searchTerm + redditEndpointSecond)
    .then((fetchedResults) => {
        return fetchedResults.json()
    })
    .then((jsonObjects) => {
        jsonObjects.data.children.forEach(grabImageURL) 
    })
    .catch((error) => {
        console.log('Like, stop trying to make fetch happen!', error)
    })
}

form_box.addEventListener('submit', (event) => {
    event.preventDefault()
    grabResults(input_box.value)
    startPresentation()
})

stop_button.addEventListener('click', (event) => {
    event.preventDefault()
    stopPresentation()
})

// Change background image of presentation_box.
const changeImage = () => {
    presentation_box.style.backgroundImage = 'url(' + imageURLs[i] + ')'
    i++
    if (i >= imageURLs.length) {
        i = i % (imageURLs.length) // Wrap back to beginning of list.
    }
}

let startPresentation = () => {
    splash_container.style.display = 'none'
    presentation_box.style.display = 'flex'
}

let stopPresentation = () => {
    clearInterval(imageInterval)
    splash_container.style.display = 'flex'
    presentation_box.style.display = 'none'
    input_box.value = ''
}