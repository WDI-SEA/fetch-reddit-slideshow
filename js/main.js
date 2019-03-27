document.addEventListener("DOMContentLoaded", main)

function main(){




}

function getImage() {
//Define our API URL
 const REQUEST_URL = 'http://www.reddit.com/search.json?q=cats+nsfw:no'
console.log(REQUEST_URL)
 

 fetch(REQUEST_URL)
 	.then(function (responseData) {
 		var newData = response.json()
 		return new Data
 	})
 	.then(function(jsonData) {

 	})
 	.catch(function(error) {
 		consle.log("you're done")
 		console.log(error)
 	})

 	
 	function renderImage(image)

 		var domImage = document.getElementById("image")
}

//Prevent default form submission, verify you cna type into form
// Use AJAX to make a request. Show dat in console
// Create an array of image URLs (tip: use filter and map)
// Make the form / tile / description hide
// Cycle through images
	//tip: use setInterval
	// Either add images, or change the src of a single image tag
// Add some interesting style / animation
// Create button to stop animation (tip: use clearInterval
