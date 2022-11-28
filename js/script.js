// http://www.reddit.com/search.json?q=cats+nsfw:no

/* ~~~~ APP STATE ~~~~ */

const TIMER_SPEED = 1000
// timer for swapping images
let slideshowInterval = null
// index of the current image being shown
let imageIndex = -1
// image urls fetched from reddit
let images = []

/* ~~~~ DOM selectors ~~~~ */

const SEARCH_FORM = document.querySelector('#search-form')
const SEARCH_INPUT = document.querySelector('#search-input')
const STOP_BUTTON = document.querySelector('#stop-button')
const SUBMIT_BUTTON = document.querySelector('#submit-button')
const SLIDESHOW_CONTAINER = document.querySelector('#slideshow-container')

SEARCH_FORM.addEventListener('submit', fetchReddit)
STOP_BUTTON.addEventListener('click', stopSlideshow)
STOP_BUTTON.style.display = 'none'

/* ~~~~ FUNCTIONS ~~~~ */

// fetches images from the reddit API
function fetchReddit(e) {
  e.preventDefault()
  // return early if there is no search query
  if(SEARCH_INPUT.value === '') return SEARCH_INPUT.placeholder = 'type something in! ⌨️'
  // fetch from reddit
  fetch(`http://www.reddit.com/search.json?q=${SEARCH_INPUT.value}+nsfw:no`)
  .then(response => response.json())
  .then(redditJson => {
    // reset to init state -- just in case
    resetState()
    // load up the images array
    images = redditJson.data.children.map(child => {
      return {
        url: child.data.url,
        ups: child.data.ups,
        subreddit: child.data.subreddit,
        author: child.data.author
      }
    })
    .filter(image => {
      // only allow .jpg file extension
      const fileExtension = image.url.slice(-4)
      if(fileExtension === '.jpg') return true
      return false
    })
    // start slideshow
    startSlideshow()
    changeSlide()
  }) 
  .catch(err => console.log(er)) 
}


// fetching reddit using async/await to handle promises
// async function fetchReddit(e) {
//   e.preventDefault()
//   if(SEARCH_INPUT.value === '') {
//     SEARCH_INPUT.placeholder = 'type something in! ⌨️'
//     return
//   }
//   try {
//     // fetch from reddit
//     const redditData = await fetch(`http://www.reddit.com/r/gonewild/search.json?q=${SEARCH_INPUT.value}+nsfw:no`)  
//     const redditJson = await redditData.json()
//     // reset to init state
//     resetState()
//     // load up the images array
//     images = redditJson.data.children.map(function(child) {
//       return {
//         url: child.data.url,
//         ups: child.data.ups,
//         subreddit: child.data.subreddit,
//         author: child.data.author
//       }
//     })
//     .filter(function(image){
//       const fileEstension = image.url.slice(-4)
//       if(fileEstension === '.jpg') return true
//       return false
//     })
//     // start slideshow
//     startSlideshow()
//     changeSlide()
//   } catch(err) {
//     console.log(err)
//   }
// }

// begins slideshow
function startSlideshow(){
  slideshowInterval = setInterval(changeSlide, TIMER_SPEED)
  SEARCH_FORM.style.display = 'none'
  STOP_BUTTON.style.display = 'inline'
}

// empties out the slideshow container div
function clearSlideshow() {
  while(SLIDESHOW_CONTAINER.firstChild) {
    SLIDESHOW_CONTAINER.removeChild(SLIDESHOW_CONTAINER.firstChild)
  }
}

// called by setInterval
function changeSlide(){
  // increment the image array index
  imageIndex++
  // reset the image index if it is out of bounds
  if(imageIndex >= images.length) imageIndex = 0
  // clear the container div
  clearSlideshow()
  // populate the slideshow container div
  const author = document.createElement('h3')
  author.innerText = 'Author ' + images[imageIndex].author

  const subReddit = document.createElement('h5')
  subReddit.innerText = 'r/' + images[imageIndex].subreddit

  const ups = document.createElement('p')
  ups.innerText = images[imageIndex].ups + ' upvotes'

  const imageSlide = document.createElement('img')
  imageSlide.src = images[imageIndex].url
  imageSlide.width = '400'

  // put all elements in a array to iterate over
  const slideshowEls = [author, subReddit, ups, imageSlide]
  console.log(slideshowEls, '🔥')
  slideshowEls.forEach(el => {
    SLIDESHOW_CONTAINER.appendChild(el)
  })
}

// resets app to init state
function resetState() {
  clearInterval(slideshowInterval)
  clearSlideshow()
  imageIndex = -1
  images = []
}

// handles stop button click
function stopSlideshow(){
  resetState()
  SEARCH_FORM.style.display = 'block'
  STOP_BUTTON.style.display = 'none'
}
