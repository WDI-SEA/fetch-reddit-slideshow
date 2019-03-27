var API_URL = 'https://www.reddit.com/search.json?limit=15&q='
var INTERVAL_DELAY = 2000
var currentImages = []
var currentIndex = 0
var interval

// Force JavaScript to wait to run its code until all the DOM has been loaded
document.addEventListener('DOMContentLoaded', function(){
  // Hook up a submit event listener to submit button
  document.getElementById('search-form').addEventListener('submit', fetchFromReddit)

  // Hook up a click event listener to the STOP button
  document.getElementById('stop').addEventListener('click', stopSlides)
})

function fetchFromReddit(e){
  // Please don't refresh the page (the default behavior of a form)
  e.preventDefault()

  // Grabbing the value out of the textbox that we want to search for
  var query = document.getElementById('query').value

  // Make sure query is not empty string
  if(query){
    // Call Reddit API with fetch
    fetch(API_URL + query)
    .then(function(responseObj){
      return responseObj.json()
    })
    .then(function(jsonResults){
      // Get the posts array
      var results = jsonResults.data.children

      // Take the values we want from the enormous JSON object
      currentImages = results.map(function(post){
        // Downsize the object
        return {
          subreddit: post.data.subreddit,
          title: post.data.title,
          url: post.data.url.replace('.gifv', '.gif')
        }
      })
      .filter(function(item){
        // Filter for image posts (remove text posts)
        return item.url.includes('i.imgur') || item.url.includes('i.redd')
      })
      console.log('current Images are', currentImages)

      // Reset the currentIndex to the first one
      currentIndex = 0

      // Load first image into DOM
      loadImage()

      // Clear old timer before setting a new one
      clearInterval(interval)

      // Kick off an interval to swap the pics
      interval = setInterval(changeSlide, INTERVAL_DELAY)
    })
    .catch(function(err){
      console.log('Error', err)
    })
  }
  else {
    console.log('Nothing to search???')
  }
}

function loadImage(){
  // Empty the existing slides from slideshow div (if any)
  var slideshow = document.getElementById('slideshow')
  slideshow.innerHTML = ''

  // Create a new image slide
  var newImg = document.createElement('img')
  newImg.src = currentImages[currentIndex].url
  newImg.style.width = '300px'
  newImg.style.height = 'auto'

  // Append newImg into slideshow div
  slideshow.append(newImg)

  // Change title to post's title
  document.getElementById('title').textContent = currentImages[currentIndex].title

  // Change subreddit to subreddit
  document.getElementById('subreddit').textContent = currentImages[currentIndex].subreddit
}

function changeSlide(){
  // Increment the image index
  currentIndex++

  // Check and make sure the index is valid - set back to 0 if too big
  if(currentIndex >= currentImages.length){
    currentIndex = 0
  }

  // Load the next image
  loadImage()
}

function stopSlides(){
  // Clear the interval to stop it
  clearInterval(interval)
}





