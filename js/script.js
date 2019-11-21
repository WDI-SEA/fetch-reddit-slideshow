// Declare global variables and constants
const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2500
let currentImages = []
let currentIndex = 0
let interval = null

// Declare Event Listeners
// Form submit
document.getElementById('search-form').addEventListener('submit', e => {
  // Prevent the form from refreshing the page
  e.preventDefault()

  // Get the user's input from the textbox
  let userQuery = document.getElementById('query').value

  // Make sure the user actually typed something
  if (userQuery) {
    // Good string - perform the search on reddit
    fetchReddit(userQuery)

    // Empty the form
    document.getElementById('query').value = ''
  }
  else {
    console.log('Empty string!')
  }
})

// Stop Button Click
document.getElementById('stop-button').addEventListener('click', () => {
  // Hide the results
  document.getElementById('slideshow-container').style.visibility = 'hidden'

  // Show the search form
  document.getElementById('form-container').style.display = 'block'

  // Clear the interval
  clearInterval(interval)
})

// Helper Functions
const fetchReddit = query => {
  console.log('Performing fetch!', query)
  // Call the Reddit API with AJAX call (using fetch function)
  fetch(API_URL + query)
  .then(response => response.json())
  .then(jsonData => {
    // Pair down the object to what I need/care about
    currentImages = jsonData.data.children.map(p => {
      return {
        title: p.data.title,
        url: p.data.url,
        subreddit: p.data.subreddit,
        upvotes: p.data.ups,
        gold: p.data.gilded > 0 ? true : false,
        posthint: p.data.post_hint
      }
    }).filter(p => {
      return p.posthint === 'image'
    })

    console.log('Cleaned up posts', currentImages)
    // Start the slideshow
    startSlideshow()
  })
  .catch(err => {
    console.log('ERROR', err)
  })
}

const startSlideshow = () => {
  console.log('Starting slides')
  // Set current index to zero (first pic)
  currentIndex = 0

  // Set up the first image (so we don't have to wait)
  placeImage()

  // Hide the form container and show the slideshow container
  document.getElementById('form-container').style.display = 'none'
  document.getElementById('slideshow-container').style.visibility = 'visible'

  // Start the interval
  interval = setInterval(changeImage, INTERVAL_DELAY)
}

const changeImage = () => {
  // Increment the curent index
  currentIndex++

  // Check the bound of the array
  if (currentIndex >= currentImages.length) {
    currentIndex = 0
  }

  // Replace the image
  placeImage()
}

const placeImage = () => {
  // Empty the result div
  document.getElementById('result').innerHTML = ''

  // Create an img tag
  let img = document.createElement('img')
  img.src = currentImages[currentIndex].url
  img.alt = currentImages[currentIndex].title

  // Create an h2 to hold the title
  let h2 = document.createElement('h2')
  h2.textContent = currentImages[currentIndex].title + (currentImages[currentIndex].gold ? ' 🏆 ' : '')

  // Create an h3 to hold the subreddit
  let h3 = document.createElement('h3')
  h3.textContent = 'r/' + currentImages[currentIndex].subreddit
  h3.style.fontWeight = 'bold'

  // Add the created elements to the page (result div)
  document.getElementById('result').append(img)
  document.getElementById('result').append(h2)
  document.getElementById('result').append(h3)
}


