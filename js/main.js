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
		//let li = document.createElement('li');
		let img = document.createElement('img');
		let imgURL = images.data.url;
		console.log(imgURL)
		img.setAttribute('src', imgURL);
		ul.appendChild(img);
	}
	//A function to filter URLs to only images
	function isAnImage(arr){
  		return (arr.includes(".jpg") || arr.includes(".png") || arr.includes(".gif"))
	}
	//function to push each api object into an array
	var firstArray = [];
	function arrayPush(object){
		firstArray = [];
		return firstArray.push(object);
	}

	//function to return the url from each of the idex of firstArray
	function returnURL(object){
		return object.data.url;
	}

	//confirm the search form is working
	console.log("form was submitted");
	console.log(requestURL)
	//Fetch the Reddit API data and sort to image URLs
	fetch(requestURL)
		.then(function(responseData){
			return responseData.json();
		})
		.then(function(jsonData){
			console.log(jsonData);
			var children = jsonData.data.children;
			console.log(children);
			//children.filter(isAnImage)
			children.forEach(displayImages)
		})
		.catch(function(error){
			console.log("There was an error:",error)
		});	
	})
const divImages = document.querySelector('.display-images');


// $('.jcarousel').jcarousel({
//     animation: {
//         duration: 800,
//         easing:   'linear',
//         complete: function() {
//         }
//     }
// });


})