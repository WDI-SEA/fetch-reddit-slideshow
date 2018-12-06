document.addEventListener("DOMContentLoaded", function(){
var imageURLS = []
var divResults = document.getElementById("results")

document.getElementById("search-form").addEventListener("submit", function(e){
	e.preventDefault();

//clear the results
removeChildElements();
resetArray();


let userInput = document.querySelector('input').value
let requestURL = `http://www.reddit.com/search.json?q=${userInput}&limit=500`//+nsfw:no`


fetch(requestURL)
	.then(function(responseData){
		return responseData.json();
	})
	.then(function(jsonData){
		// this allows me to get to the URL section of the obj 
		var sample = jsonData.data.children
		sample.forEach(function(item){
			let myItem = item.data.url;
			// plug these urls into an empty array
			imageURLS.push(myItem);
		}) 
		// Now filter those URLS in the array for just pictures with .jpg
		var newArray = imageURLS.filter(containsPic);
		newArray.forEach(addImgs);
	})
	.catch(function(error){
		console.log("WOW!!! How could you have messed that up so badlY?!", error);
	})

})


document.getElementById("clear").addEventListener("click", removeChildElements);

function containsPic(string){
	var jpg = ".jpg";
	var png = ".png"; // how do I include this in the function as an OR???
	return string.includes(jpg);
}

function addImgs(myPic){
	let image = document.createElement('img')
	image.src = myPic
	divResults.appendChild(image)
}

function removeChildElements(){
	// removes all the img elements so that it clears reults
	var userInput = document.querySelector('input').value
	console.log(userInput)
	userInput.textContent = ""
	var childElements = document.getElementById("results");
		while (childElements.firstChild) {
    		childElements.removeChild(childElements.firstChild);
		}
}

// resets the imageURLs array back to 0
function resetArray(){
	for(i = 0; i = imageURLS.length; i++){
		imageURLS.shift(i);
	};
}


})
