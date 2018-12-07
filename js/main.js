console.log("JS is running")
document.addEventListener("DOMContentLoaded", function(){
console.log("DOM is loaded")
	document.querySelector("#search-form").addEventListener('submit', function(e){
		e.preventDefault();

	let userInput = document.querySelector('#search-box').value;
	let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no`;
	let ul = document.querySelector('ul');
	//Add an img element and add the src attribute with the image
	function displayImages(images){
		//create a variable for the img element on the page
		let img = document.createElement('img');
		//define the src of the img to be the img url
		img.setAttribute('src', images);
		//append the image to the unordered list
		ul.appendChild(img);
	}
	//A function to filter URLs to only images
	function isAnImage(arr){
  		return (arr.includes(".jpg") || arr.includes(".png") || arr.includes(".gif") || arr.includes(".jpeg"))
	}
	var urlArray = [];
	var imgArray = [];
	//function to return the url from each of the index of firstArray
	function returnURL(object){
		//Add the jsonData to an array
		urlArray.push(object.data.url);
		//filter the array to only retain images
		imgArray = urlArray.filter(isAnImage);
	}

	//confirm the search form is working
	console.log("form was submitted");
	//Fetch the Reddit API data and sort to image URLs
	fetch(requestURL)
		.then(function(responseData){
			return responseData.json();
		})
		.then(function(jsonData){
			//break out the first jsonData array into another array
			var children = jsonData.data.children;
			//grab only the url for each item in the array
			children.forEach(returnURL);
			//send each index of that array to the display on page function
			imgArray.forEach(displayImages);
		})
		.catch(function(error){
			console.log("There was an error:",error)
		});	
	})
	const divImages = document.querySelector('.display-images');

	//A function that iterates through the imgArray and assigns the img src on a set Interval
	function intervalDisplay(){
		
	}

// $('.jcarousel').jcarousel({
//     animation: {
//         duration: 800,
//         easing:   'linear',
//         complete: function() {
//         }
//     }
//});


})