console.log("what up tho")
document.addEventListener("DOMContentLoaded",main)
document.getElementById('searchBtn').addEventListener("click",fetchIt)


//INFO
	// When the user enters a search term and presses enter
	// The form / title / description should hide
	// Show a loading message (optional)
	// Fetch related posts from reddit (with ajax)
	// Display animation / slideshow of images (jQuery)
	// Show a button to stop / reset the animation
	// Repeat animation until use clicks "stop"




	// When the user clicks the "stop" button
	// Animation stops / images are removed
	// Form / title / description are shown again
	// User can enter a new search term

	// Cycle through images
	// tip: use setInterval
	// Either add images, or change the src of a single image tag
	// Add some interesting style / animation
	// Create button to stop animation (tip: use clearInterval).
	//STRETCH GOAL
		//Make the page go black, and load images full screen
		//left right buttons on edges
		//left right keys to move + timer



function main (){
	// THIS NEVER WORKS FOR ME
	//document.getElementById('searchBtn').addEventListener("submit", function(event){
		//event.preventDefault();
	//	console.log('lol')
	//})
	const slideShowBox = document.getElementById("slideShow")
	// Define our API URL
	


	// render quote on the DOM
	function renderPic(quote, author){
		//Grab the DOM elements
		//var domQuote = document.getElementById('quote')
		//var domSource = document.getElementById('source')
		// domQuote.textContent = quote
		// domSource.textContent = author
		//set textContent to their relevant values

	}
}

function fetchIt (){
	var imgUrl, onlyImgs
	//Making sure fetchIt ran
	console.log("Sanity Check fetchIt")

	//not sure how I'm going to construct the final search link, 
	//broke into two chunks + a whole one for now CLEAN UP LATER
	const REQUEST_URL1 ="https://www.reddit.com/search.json?q="
	const REQUEST_URL2 ="+nsfw:no"
	const REQUEST_URL = "http://www.reddit.com/search.json?q=cats+nsfw:no"

	//  fetch a post
	fetch(REQUEST_URL)
	.then(function(responseData) {
		return responseData.json()		
	})
	.then(function(jsonData){
		//make an array of objects from the results
		var picArray = jsonData.data.children;
		console.log("Sanity check" + picArray[0])
		imgUrl = picArray.map(retrieveImgUrl)
		onlyImgs = imgUrl
		
		console.log("imgUrl=",imgUrl)
		// renderPic()
	})
	.catch(function(error) {
		console.log("you done gone goofed"+error)
	})

}

function retrieveImgUrl(item) {
		// return what we want to be in the new array
		return item.data.url;
	}