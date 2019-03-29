var API_URL = 'https://www.reddit.com/search.json?limit=15&q='
var INTERVAL_DELAY = 3000
var currentImages = []
var currentIndex = 0
var interval

//Force JS to wait to run its code until the dom has loaded
document.addEventListener('DOMContentLoaded', function(){
// Call reddit API; load resulting images into DOM

//hook up click event listener to submit
document.getElementById('search-form').addEventListener('submit', fetchFromReddit)

})

function fetchFromReddit(e){
	//prevent the default page refresh on submission
	e.preventDefault()
	//loads the text value into query variable
	var query = document.getElementById('query').value
	console.log('you are looking for:', query)

	// Call reddit api with fetch
	if (query){
		fetch(API_URL + query)
		// console.log(API_URL + query)

		.then(function(responseObj){
			return responseObj.json()
		})

		.then(function(jsonResults){
			var results = jsonResults.data.children
			// Some filter for image posts (remove text posts)
			
			// Take the values we want from the json ob
			currentImages = results.map(function(post){
				return {
					subreddit: post.data.subreddit,
					title: post.data.title, 
					url: post.data.url.replace('.gifv', 'gif')
				}
			})
			.filter(function(item){
				// Filter for image posts (remove text posts)
				console.log(item)
				return item.url.includes('i.imgur') || item.url.includes('i.redd')
			})

			//Reset the currentIndex to the first one
			currentIndex = 0
			// Load resulting images into DOM	
			console.log(currentImages);

			// Load first image into DOM
			loadImage()
			// Kick off an interval
			interval = setInterval(changeSlide, INTERVAL_DELAY)

		})

		//Errors
		.catch(function(err){console.log('Error:', err)})

	} else {
		console.log('nothing to search')
	}
}

function loadImage(){
	// Empty the existing slides from slideshow div (if any)
	document.getElementById('slideshow').innerHTML = ''

	// Create a new image slide
	var newImg = document.createElement('img')
	newImg.src = currentImages[currentIndex].url
	newImg.style.width = "300px"
	newImg.style.height = "auto"

	//Append newImg into slideshow div
	slideshow.append(newImg)

	//Change title to post's title
	document.getElementById('title').textContent = currentImages[currentIndex].title
	
	// Change subreddit to subreddit
	document.getElementById('subreddit').textContent =currentImages[currentIndex].subreddit
}

function changeSlide(){
	currentIndex++
	console.log('currentIndex is now:',currentIndex)
	// Increment the image index

	// check and make sure the index is valid - set back to 0 if too big
	if(currentIndex > currentImages.length -1){
		currentIndex = 0
	}
	// load the next image
	loadImage()
}