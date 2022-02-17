// http://www.reddit.com/search.json?q=cats+nsfw:no&limit=100

// APP STATE
// ms speed of the interval
const TIMER_SPEED = 1000 
// interval for the slideshow
let slideshowInterval
// current image index
let imageIndex = -1
// an array of images to display
let images = []

// DOM ELEMENTS 
let titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer

// FUNCTIONS
// invokes on fomr submit and fetches reddit
function fetchReddit(e) {
  e.preventDefault()
  searchInput.value = 'chonkers' // TODO: remove this when finished
  if (!searchInput.value) return searchInput.placeholder = 'type something in!'
  const searchUrl =  `http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no&limit=100`
  fetch(searchUrl)
    .then(response => response.json())
    .then(redditJson => {
      images = redditJson.data.children.map(child => {
        return {
          url: child.data.url,
          sub: child.data.subreddit,
          author: child.data.author
        }
      })
      .filter(child => child.url.slice(-4) ==='.jpg' || child.url.slice(-4) === '.png')

      // start the slideshow
      // hide everything on screen
      titleHeader.style.display = 'none'
      descriptionP.style.display = 'none'
      searchForm.style.display = 'none'
      // show the stop button and slideshow div
      stopButton.style.display = 'inline'
      slideshowContainer.style.display = 'block'
      // show slideshow container

      // start the interval for the slideshow
    })
    .catch(console.log)
}

function stopSlideshow() {
  console.log('stop the slideshow')
}

// DOM CONTENT LOAD INITIALIZER
document.addEventListener('DOMContentLoaded', () => {
  titleHeader = document.querySelector('#title-header')
  descriptionP = document.querySelector('#description-p')
  searchForm = document.querySelector('#search-form')
  searchInput = document.querySelector('#search-input')
  stopButton = document.querySelector('#stop-button')
  slideshowContainer = document.querySelector('#slideshow-container')
  // console.log(titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer)
  // listen for submits
  searchForm.addEventListener('submit', fetchReddit)
  // listen clicks on the stop button
  stopButton.addEventListener('click', stopSlideshow)
  // show the stop button and slideshow div
  stopButton.style.display = 'none'
  slideshowContainer.style.display = 'none'
})