console.log("what up tho")
document.addEventListener("DOMContentLoaded",main)
	
	//not sure how I'm going to construct the final search link, 
	//broke into two chunks + a whole one for now CLEAN UP LATER
	const REQUEST_URL1 ="https://www.reddit.com/search.json?q="
	const REQUEST_URL2 ="+nsfw:no"
	const REQUEST_URL = "http://www.reddit.com/search.json?q=cats+nsfw:no"

document.getElementById('formSearch').addEventListener("submit",function(event){
	//prevent the normal function
	event.preventDefault()
	//construct the string needed
	var searchValue = document.getElementById("searchTerm").value
	console.log("searchValue=",searchValue)
	//get that shit
	theSearch = REQUEST_URL1 + searchValue + REQUEST_URL2
	fetchIt(theSearch)
})
var results;

function retrieveImgUrl(item) {
		// return what we want to be in the new array
		return item.data.url;
	}
function isAnImage (url){
	//new array with JUST posts from reddit and imgur
	return url.includes("i.redd");
}
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



	// get info from search box and make a new link out of it

	//  fetch a post
	fetch(theSearch)

	.then(function(responseData) {
		//pass the json to the next .then
		return responseData.json()		
	})
	.then(function(jsonData){
		//make an array of objects from the results
		var picArray = jsonData.data.children;

		//making sure that worked
		console.log("Sanity check" + picArray)
		//mapping the data for just a pice of it - could use some clarification
		imgUrl = picArray.map(retrieveImgUrl)
		results = imgUrl.filter(isAnImage)

		return results;
		
	})
	.then(function(){
		
		console.log("results:",results)
		console.log("imgUrl=",imgUrl)
		var thePic = document.getElementById("pic")
		//hard coded for now
		thePic.src = results[0];
		
		// renderPic()
})
	.catch(function(error) {
		console.log("you done gone goofed"+error)
	})

}

