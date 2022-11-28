// variables defined
let images = []
let imageIndex = -1
let info, search, searchInfo, resetButton, pictures


// function work
function fetchReddit(e) {
    // prevent refresh
    e.preventDefault()
    // get value of search 
    const value = searchInfo.value
    if (value === '') {
        searchInfo.placeholder = 'Type something in to search!'
    }
    // put that value in the search url and do a fetch
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(responseData => responseData.json())
        .then(redditJson => {

            // get images array
            images = redditJson.data.children.map(child => {
                return {
                    url: child.data.url,
                    author: child.data.author,
                    ups: child.data.ups,
                    subreddit: child.data.subreddit
                }
                    .filter(image => {
                        const fileExtension = (image.url.slice(-4))
                        return fileExtension === '.jpg' || fileExtension === '.png'
                    })
            })
            slideshow()
            slideshowInterval = setInterval(slideshow, 5000)
            // hid ethe form, show the stop button in its place
            info.style.display = 'none'
            resetButton.style.display = 'inline'
        })
        .catch(console.warn)
}

function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function stop() {
    // clear the slideshow
    clearInterval(slideshowInterval)
    clearElement(pictures)
    // hide button
    resetButton.style.display = 'none'
    // show info
    info.style.display = 'block'
    //reset all state
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    // increment value
    imageIndex++
    // check array boundary -- if so, wrap back to 0
    if (imageIndex >= images.length) {
        imageIndex = 0
    }
    // change slideshow
    // clear out slideshow
    clearElement(pictures)
    // create the DOM elements
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    const newUpsP = document.createElement('p')
    // sent the properties fo the DOM elements
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '500'
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    // mount the elements on the pictures container
    pictures.append(newImage, newH2, newSubP, newUpsP)
}


// DOM Content loaded at the end
document.addEventListener('DOMContentLoaded', () => {
    info = document.querySelector('#info')
    search = document.querySelector('#search')
    searchInfo = document.querySelector('#searchInfo')
    resetButton = document.querySelector('#resetButton')
    pictures = document.querySelector('#pictures')

    searchInfo.addEventListener('submit', fetchReddit)
    resetButton.addEventListener('click', stop)
    // hide button
    resetButton.style.display = 'none'
})
