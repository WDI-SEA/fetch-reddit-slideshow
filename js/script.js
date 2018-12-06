var imageURLS = []
var divResults = document.getElementById("results")
var currentIndex, adjustedGif, currentIndex, slideShow

function retrieveImgUrls(item){
	return item.data.url
}

function containsPic(string){
	return string.includes("i.imgur") || string.includes("i.redd");
}

function convertGif(filterGif){
	return filterGif.replace(".gifv", ".gif")
}

function removeChildElements(){
	// removes all the img elements so that it clears reults
	clearInterval(slideShow);
	var userInput = document.querySelector('input')
	userInput = ""
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

function slide(){
	if(currentIndex === adjustedGif.length-1) {
		currentIndex = -1;
	}
	currentIndex++;
	let currentImg = document.querySelector("img")
	currentImg.src = adjustedGif[currentIndex];
}

function makeFetchWork(url){
	fetch(url)
	.then(function(responseData){
		return responseData.json();
	})
	.then(function(jsonData){
		// this allows me to get to the URL section of the obj 
		sample = jsonData.data.children
		imagesArrays = sample.map(retrieveImgUrls)
		justPics = imagesArrays.filter(containsPic)
		adjustedGif = justPics.map(convertGif)
		currentImg = document.createElement("img")
		currentIndex = 0;
		currentImg.src = adjustedGif[currentIndex]
		divResults.appendChild(currentImg)
		slideShow = setInterval(slide, 2000)
		
	})
	.catch(function(error){
		console.log("WOW!!! How could you have messed that up so badlY?!", error);
	})
}

document.addEventListener("DOMContentLoaded", function(){

	document.getElementById("search-form").addEventListener("submit", function(e){
		e.preventDefault();

	//clear the results
	removeChildElements();
	resetArray();

	let userInput = document.querySelector('input').value
	let requestURL = `http://www.reddit.com/search.json?q=${userInput}&limit=500`//+nsfw:no`
	// makeFetchWork(requestURL);
	clearInterval(slideShow);
	if(userInput != ""){
		makeFetchWork(requestURL);
	} else {console.log("please enter a value");}
	
	})

})


document.getElementById("clear").addEventListener("click", removeChildElements);
