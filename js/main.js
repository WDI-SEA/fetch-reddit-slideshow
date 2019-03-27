const REQUEST_URL = "http://www.reddit.com/search.json?q="
const INTERVAL_DELAY = 2000
var imgSourceArray = []
var currentIndex = 0
var interval
document.addEventListener("DOMContentLoaded", main)

function main() {
	// Define our API URL

	// Make button clickable
	document.getElementById("search-form").addEventListener("submit", getValue)

	document.getElementById("stop").addEventListener("click", stop)
}

// Get value on button click
function getValue(e) {
	e.preventDefault()
	var userInput = document.getElementById("input").value
	// Run if userInput isn't empty
	if(userInput) {
		// Call Reddit API with fetch
		fetch(REQUEST_URL+userInput)
			.then(function(data) {
				return data.json()
			})
			.then(function(jsonData) {
				var postArray = jsonData.data.children
				imgSourceArray = postArray.map(function(post) {
					return {
						subreddit: post.data.subreddit,
						title: post.data.title,
						url: post.data.url.replace(".gifv", ".gif")
					}
				})
				.filter(function(item) {
					return item.url.includes("i.imgur") || item.url.includes("i.redd")
				})
			postImage()
			clearInterval(interval)
			interval = setInterval(nextSlide, INTERVAL_DELAY)
			})
			.catch(function(error) {
				console.log("shit:", error)
			})	
	} else {
		console.log("type something, dumbass")
	}
}
function postImage() {
	var slideshow = document.getElementById("slideshow")
	// Empty the existing slides from slideshow
	slideshow.innerHTML = ""
	// Create a new image slide
	var returnImg = document.createElement("img")
	returnImg.src = imgSourceArray[currentIndex].url
	// Append returnImg into slideshow div
	slideshow.appendChild(returnImg)
	// Change title to post's title
	document.getElementById("title").textContent = imgSourceArray[currentIndex].title
	document.getElementById("subreddit").textContent = imgSourceArray[currentIndex].subreddit
}

function nextSlide() {
	currentIndex++
	if (currentIndex >= imgSourceArray.length) {
		currentIndex = 0
	}
	postImage()
}

function stop() {
	clearInterval(interval)
}

