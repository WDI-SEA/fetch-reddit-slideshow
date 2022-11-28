// js varaibles
let images = []
let imageIndex = -1
let value = ''
let slideshowInterval
// varaibles for dom elements
let formContainer, searchForm, searchInput, stopButton, slideshowContainer

// functions
function fetchReddit(e) {
    // prevent the page from refreshing
    e.preventDefault()
    // get the value that the user typed into the form
    value = searchInput.value
    console.log(value)
    // return the function early if there is no input
    if (value === '') {
        searchInput.placeholder = 'type something in 🎹!'
        return
    }
    // put that value in the search url and do a feath to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(anything => anything.json())
        .then(redditJson => {
            // console.log(redditJson.data.children)
            // map reddit data to our images array
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        author: child.data.author,
                        ups: child.data.ups,
                        subreddit: child.data.subreddit
                    }
                })
                // filter out non image results
                .filter(image => {
                    // console.log(image.url.slice(-4))
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension === '.png'
                })
            // console.log(images)
            // start the slideshow
            slideshow()
            slideshowInterval = setInterval(slideshow, 10000)
            // hide the form, show the stop button in its place
            formContainer.style.display = 'none'
            stopButton.style.display = 'inline'

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
    clearElement(slideshowContainer)
    // hide stop button
    stopButton.style.display = 'none'
    // show form
    formContainer.style.display = 'block'
    // reset all state (to be good programers)
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    // increment value
    imageIndex++
    // check to make sure we are not out of bounds -- if so, wrap back to 0
    if (imageIndex >= images.length) {
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
    // sent the props of the dom els
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '600'
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    // mount the els on the slideshow container
    slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
}

// DOM contented loaded -- load up the varaibles for DOM els
document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideshowContainer = document.querySelector('#slideshowContainer')
    // mount event listeners
    searchForm.addEventListener('submit', fetchReddit)
    stopButton.addEventListener('click', stop)
    // hide stop button
    stopButton.style.display = 'none'
})

// addEventListener(eventType, callback) {
//     // do some logic based on the event type
//     // creates a new event object
//     const event = {
//         target: ...,
//     }
//     callback(event)








































// document.addEventListener('DOMContentLoaded', () => {

//     // sets submit button = to submit
//     const submit = document.querySelector('#submit')
//     //sets clear button = to clear
//     const clear = document.querySelector('#clear')
//     //sets the search-bar = to input
//     const input = document.querySelector('#search-bar')
//     console.log(submit, clear, input)
    

//     // adds event listener on click of submit launches fetch
//     submit.addEventListener('click', (event) =>{
//         console.log('the button was clicked')
//         // sets the value of input in the search bar on the URL
//         const urlSearch= `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
//         // console.log(urlSearch)
//         // fetches the searched for URL
//         fetch(urlSearch)
//         //Jsonifies the results
//         .then((result) => result.json())
//         // data translated to an array or object
//         .then((redditData) => {
//             // checks if redditData is array === false
//             let isArray = Array.isArray(redditData)
//             console.log(isArray)
//             // checks if redditData.data.children is array === true
//             let isChildrenArray = Array.isArray(redditData.data.children)
//             console.log(isChildrenArray)            
//             //logs the location of the reddit data
//             // console.log(redditData.data.children[0].data.url)
//             // need to remove the non img files from the array 
//             let imgArray = [redditData.data.children.map]







//             //runs a foreach loop to console.log the data



//             let imageData = []
//             redditData.data.children.forEach(children => {
//                 imageData = children.data.url
//                 console.log(imageData) 
//             })
//             setInterval(imageData,10000)

//             const img = document.getElementById('img')
//             img.src= imageData
            
            
//         })
//     })
// })
