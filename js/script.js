const redditEndpoint = 'http://www.reddit.com/search.json?q=limit=100+nsfw:no+'
let imageURLs = []
let i = 0 // Index for iterating through imageURLs.

// imageInterval needs to be global so that I can 'pause' it from outside my 'start' function.
let imageInterval

// Figure out whether or not each search result has an image. This is where I'll need to find the exact path of my JSON objects.
const grabImageURL = (jsonObject) => {
    // jsonObject.data.children[].data.url_overridden_by_dest
    let url = jsonObject.data.url_overridden_by_dest
    if (url) { // Not all objects have this key value. For example, text posts don't have this attribute.
        if ( url.includes('.png') || url.includes('.jpg') ) {
            imageURLs.push(url)
            console.log('url', url)
            console.log('imageURLs',imageURLs)
        }
    }
    // changeImage()
    // imageInterval = setInterval(changeImage, 3000) // Only start doing this once we have values in imageURLs.
}

// Grab results
const grabResults = (searchTerm) => {
    fetch(redditEndpoint + searchTerm)
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
})

// Change background image of presentation_box.
const changeImage = () => {
    presentation_box.style.backgroundImage = 'url(' + imageURLs[i] + ')'
    i++
}

// let startPresentation = () => {
//     // splash_container.style.display = 'none'
// }

// let stopPresentation = () => {
//     clearInterval(imageInterval)
// }

