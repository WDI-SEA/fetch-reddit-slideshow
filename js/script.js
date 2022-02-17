console.log('JS is linked')

// redo following code-along w/notes

// APP STATE
// step 1: ms speed of the interval
const timer_speed = 1000
// step 2: interval for the slideshow
let slideshowInterval
// step 3: need the current image index
let imageIndex = -1
// step 4: an array of images to display
let images = []

// DOM ELEMENTS
// step 5: 
let titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer





// FUNCTIONS
// step 8: write function to  invoke on form submit and fetches reddit
function fetchReddit(e) {
    e.preventDefault()
    // step 9: console.log to make sure its working
    // console.log('you should fetch some reddit')
    // step 15: stop search early if no value
    if (!searchInput.value) return searchInput.placeholder = 'type something in!'
    // step 12: search input here
    // console.log(searchInput.value)
    // step 13: link the reddit api
    const searchUrl =  `http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no&limit=100`
    // step 14: console.log to check
    // console.log(searchUrl)
    // step 16: fetch the searchUrl
    fetch(searchUrl)
        .then(response => response.json())
        .then(redditJson => { // step 17: map the data
            images = redditJson.data.children.map(child => { //step 18: map each child
                return {
                    url: child.data.url,
                    sub: child.data.subreddit,
                    author: child.data.author
                }
            }) 
            .filter(child => child.url.slice(-4) ==='.jpg' || child.url.slice(-4) === '.png')//step 20: do .filter to filter the images 

            // step 19: 
            // console.log(images) // step 20: delete this
            // start the slideshow
            // step 21: hide everything on screen
            titleHeader.style.display = 'none'
            descriptionP.style.display = 'none'
            searchForm.style.display = 'none'
            // step 22: show the stop button and slideshow div
            stopButton.style.display = 'inline'
            // show slideshow container
            slideshowContainer.style.display = 'block'
            // step 24: start the interval for the slideshow
            slideshowInterval = setInterval(changeSlide, timer_speed)
        })
        .catch(console.log) 
}

// step 25: make function to change slides
function changeSlide() {
    // increment the current index
    imageIndex++
    // step 26: if the current index is too large-- reset to the beginning
    if (imageIndex >= images.length) imageIndex = 0
    // console.log(imageIndex, images[imageIndex])
    // step 31:
    while (slideshowContainer.firstChild) {
        slideshowContainer.removeChild(slideshowContainer.firstChild)
    }
    // step 27: create some elements and append them to the slideshow div
    const image = document.createElement('img')
    image.src = images[imageIndex].url
    image.alt = 'image fetched from reddit'
    image.width = window.innerWidth //makes all the images same size
    image.height = window.innerHeight
    // step 28:
    const author = document.createElement('h4')
    author.innerText = images[imageIndex].author
    // step 29:
    const sub = document.createElement('p')
    sub.innerText = images[imageIndex].sub

    // step 30: append new elements to the slideshow element
    slideshowContainer.appendChild(image, author, sub)
}

// step 12: make function stopSlideshow()
function stopSlideshow() {
    // console.log('stop the slideshow')
    // step 32: hide the slideshow
    stopButton.style.display = 'none'
    slideshowContainer.style.display = 'none'
    // step 33: reset app state
    clearInterval(slideshowInterval)
    images = []
    imageIndex = -1
    // step 34: show original landing page
    titleHeader.style.display = 'inline'
    descriptionP.style.display = 'inline'
    searchForm.style.display = 'block'
}



// DOM CONTENT LOAD INITIALIZER
// step 6:
document.addEventListener('DOMContentLoaded', () => {
    titleHeader = document.querySelector('#title-header')
    descriptionP = document.querySelector('#description-p')
    searchForm = document.querySelector('#search-form')
    searchInput = document.querySelector('#search-input')
    stopButton = document.querySelector('#stop-button')
    slideshowContainer = document.querySelector('#slideshow-container')
    // step 7: console.log just to make sure its all working
    // console.log(titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer)
    // step 10: add eventlistener to listen for submits
    searchForm.addEventListener('submit', fetchReddit)
    // step 11: add eventlistener to listen for clicks on the stop button
    stopButton.addEventListener('click', stopSlideshow)
    // step 23: show the stop button and slideshow div
    stopButton.style.display = 'none'
    slideshowContainer.style.display = 'none'
})













// let searchBox = document.querySelector('#userInput')
// let form = document.querySelector('form')
// let search = document.querySelector('#search-button')
// let stop = document.querySelector('#stop-button')
// let picture = document.querySelector('#picture')
// let imgContainer = document.querySelector('.img-container')
// let imageUrl = []
// let pp = 0
// let slideshow
// imgContainer.style.display = 'none'

// document.addEventListener('DOMContentLoaded', () => {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault()
//     })
// })

// const showImages = () => {
//     pp++
//     if (pp < 10) {
//         picture.setAttribute('src', imageUrl[pp])
//     }
//     else {
//         pp = 0
//     }
// }

// const searchImages = () => {
//     let searchInput = document.querySelector('#userInput').value
//     let searchInputString = searchInput.toString()
//     let requestedUrl = `https://www.reddit.com/search.json?q=${searchInputString}+nsfw:no`
//     console.log(requestedUrl)
//     fetch(requestedUrl)
//         //get thumbnail and push to imageUrl
//         .then((responseData) => {
//             // console.log(responseData)
//             return responseData.json()
//         })
//         .then((jsonData) => {
//             console.log(jsonData)
//             // add thumbnail to array using for loop
//             for (let i = 0; i < 10; i++) {
//                 imageUrl
//         .push(jsonData.data.children[i].data.thumbnail)
//             }
//             cycle()
//             search.hidden = true
//             searchBox.hidden = true
//             imgContainer.style.display = 'block'
//             console.log(jsonData)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }
// // searchImages()

// const cycle = () => {
//     slideshow = setInterval(showImages, 1500)}
// search.addEventListener('click', searchImages)

// // stop button
// function stopImages() {
//     clearInterval(slideshow)
//     search.hidden = false
//     searchBox.hidden = false
//     picture.setAttribute('src', ' ')
//     imgContainer.style.display = 'none'
//     searchBox.value = ''
//     imageUrl = []
// }
// stop.addEventListener('click', stopImages)