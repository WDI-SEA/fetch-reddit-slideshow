
// const go = document.querySelector('#submit')

// const search = document.querySelector('#search')

// wanted to put search inplace of cat in url below
// const url = `https://api.reddit.com/search?q=cats+nsfw:no`

// const acao = 'Access-Control-Allow-Origin: *'
// idk what this does ^^

// const xml = new XMLHttpRequest();
// idk what this is really either
 
// // document.querySelector('#submit').addEventListener('click', getImages())

// function getImages() {
//         fetch(url)
//         .then(function(response) {
//             //not allowed access
//             // no-cors mode?
//             return response;
//             console.log(response)
//         })
        
//     }
// // this way it seems like i have to make a proxy server to communicate to reddit through...
// // definitely a bit stuck
// was it prevent default that messed me up
//...

// with weston

// js variables


// variables for dom elements
// we will populate this array
let images = []
let imageIndex = -1
let value = ''
let slideshowInterval
// value for alts
let formContainer, searchForm, searchInput, stopButton, slideshowContainer

// functions
function fetchReddit(e) {
    e.preventDefault()
// this important ^^^
    // get the value that the user typed
    value = searchInput.value
    // put the value in the search url and do a fetch to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(anything => anything.json())
        // next .then is very important
        .then(redditJson => {
            // below do one point at a time to specify where u grab
            console.log(redditJson.data.children)
            // map reddit data to the images array
            images = redditJson.data.children.map(child => {
                return {
                    url: child.data.url,
                    author: child.data.author,
                    ups: child.data.ups,
                    subreddit: child.data.subreddit
                } 
            })
            .filter(image => {
                //console.log(image.url.slice(-4))
                // negative will wrap back around and look at the last digits of the file
                const fileExtension = image.url.slice(-4)
                return fileExtension === '.jpg' || fileExtension === '.png'
            })
            // console.log(images)
            // filter out non image results
            // start the slideshow
            slideshow()
            slideshowInterval = setInterval(slideshow, 1000)
            // hide the form
            formContainer.style.display = 'none'
            stopButton.style.display = 'inline'
        })
        .catch(console.warn)
    // i need the catch??? so like is that promise
}

function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function stop() {
    // clear the slideshow
    clearInterval(slideshowInterval)
    clearElement(slideshowContainer)
    // hide stop button
    stopButton.style.display = 'none'
    // show form
    formContainer.style.display = 'block'
    // reset site state, reset variables ( to be good programmers )
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    // increment value
    imageIndex++
    // check to make sure we are not out of bounds -- if so, wrap back to 0
    if(imageIndex >= images.length) {
        imageIndex = 0
    }
    // change slideshow
    // clear out the slideshow container
    clearElement(slideshowContainer)
    // create the dom els we want
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    const newUpsP = document.createElement('p')
    // set the props of the dom els
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '600'
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    // mount the els on the slideshow container
    slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
}



// dom content loaded -- load up variables for dom els
document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideshowContainer = document.querySelector('#slideshowContainer')
    // console.log(formContainer, searchForm, searchInput, stopButton, slideshowContainer)
    // mount event listeners
    searchForm.addEventListener('submit', fetchReddit) // do not envoke function
    stopButton.addEventListener('click', stop)
    // hide stop button, so set display none
    stopButton.style.display = 'none'
})


// addEventListener(eventType, callback) {
// do some logic based on event type
// creates a new event object
// const event = { target: .., other stuff} callback(event)
//}