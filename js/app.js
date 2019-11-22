const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('user-input')
const INTERVAL_DELAY = 3000
let imageResults = []
let currentIndex = 0
let interval = null

//Form Event Listener
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const searchTerm = searchInput.value
	//Check if Blank
	if (searchTerm) {
		//Search Reddit
		searchReddit(searchTerm)
	}
	else {
		//Show Error Message if searchTerm is Blank
		showErrorMessage('Please add a search term', 'alert')
	}
	document.getElementById('user-input').value = ''
})

//Reddit search and return array of images to redditImages
const searchReddit = function(searchTermFromUserClick) {
	console.log("fetching from Reddit ....")
	fetch(`http://www.reddit.com/search.json?q=${searchTermFromUserClick}&sort=relevance+nsfw:no`)
	.then(response => response.json())
	.then (data => {
		currentImages = data.data.children.map(p => {
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
		console.log('Error')
		console.log(err)
	})
}

const startSlideshow = () => {
	console.log('starting slides')
	currentIndex = 0
	placeImage()

	  // Hide the form container and show the slideshow container
	  document.getElementById('search-container').style.display = 'none'
	  document.getElementById('slideshow-container').style.visibility = 'visible'
	  document.getElementById('stop-button').style.visibility = 'visible'
	  // Start the interval
	  interval = setInterval(changeImage, INTERVAL_DELAY)
	}


//Show Error Message
function showErrorMessage(message, className) {
	const div = document.createElement('div')
	div.className = className
	div.appendChild(document.createTextNode(message))
	const searchContainer = document.getElementById('search-container')
	const search = document.getElementById('form-holder')
	searchContainer.insertBefore(div, search)
	//Timout alert
	setTimeout(()=>{
		document.querySelector('.alert').remove()
	}, 3000)
}

const placeImage = () => {
	// Empty the result div
	document.getElementById('user-input').innerHTML = ''
  
	// Create an img tag
	let img = document.createElement('img')
		img.src = currentImages[currentIndex].url
		img.class ='slideshow-image'
		img.id ='image'
		img.alt ='slideshow image'

	// Add the created elements to the page (result div)
	document.getElementById('slideshow-container').append(img)
  }

const changeImage = () => {
	currentIndex++
	if (currentIndex >= currentImages.length) {
		currentIndex = 0
	}
	placeImage()
}


// Stop Button Click
	document.getElementById('stop-button').addEventListener('click', () => {
	document.getElementById('slideshow-container').style.visibility = 'hidden'
	document.getElementById('btn').style.visibility = 'hidden'
	document.getElementById('form-container').style.display = 'inline-flexbox'
	clearInterval(interval)
})
