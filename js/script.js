let imageURLs = []
let i = 0 // Index for iterating through imageURLs.

// imageInterval needs to be global so that I can 'pause' it from outside my 'start' function.
let imageInterval

// Figure out whether or not each search result has an image. 
// If it does, grab that url and add it to my array of img URLs.
const grabImageURL = (jsonObject, index) => { // We don't use index but want to write it out to remind myself that forEach also gives the index. 
    // jsonObject.data.children[].data.url_overridden_by_dest
    let url = jsonObject.data.url_overridden_by_dest

    if (url) { // Not all objects have this key value. For example, text posts don't have this attribute.
        if( url.includes('.png') || url.includes('.jpg') ) {
            imageURLs.push(url)
        }
    }
}

// Grab results
const grabResults = (searchTerm) => {
    fetch(`http://www.reddit.com/search.json?q=nsfw:no+${searchTerm}&limit=100`)
    .then((fetchedResults) => {
        console.log('This delay tells us when we hear back from Reddit') // Note: This takes a while to show up. 
        return fetchedResults.json()
    })
    .then((jsonObjects) => {
        jsonObjects.data.children.forEach(grabImageURL) // Can also use filter, where if a value doesn't exist on an object it'll evaluate as not being added to the return array.
        // We can only start doing the below once we have values in imageURLs.
        changeImage()
        imageInterval = setInterval(changeImage, 3000) 
    })
    .catch((error) => console.log('Like, stop trying to make fetch happen!', error))
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
    i = 0
    imageURLs = []
    input_box.value = ''
}