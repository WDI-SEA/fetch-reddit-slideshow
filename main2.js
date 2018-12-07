let results;
let currentIndex;
let slideshow

function retrieveImgUrls(item) {

	return item.data.url;
}

function isAnImg(url){
	return url.includes("i.imgur") || url.includes ("i.redd");
}

function convertGif(onceFilteredURL) {
	return onceFilteredURL.replace("gifv", ".gif");
}
function slide(){
	if(currentIndex===results.length-1){
		currentIndex = -1;
	}
	currentIndex++;
	//change the source attribute of the img
	let currentImg = document.querySelector("img");
	currentImg.src = results[currentIndex];

}

function makeFetchHappen(url) {

	let imgURLS, onlyImgs;

	fetch(url)
	.then(function(responseObject){
		// console.log(responseObject);
		return responseObject.json();
	})
	.then(function(jsonResults){
		//store the array of results objects
		let resultsObjectsArr = jsonResults.data.children;
		//map the results objects array to an array of just urls which we grab from inside 
		//those objects
 
		imgURLS = resultsObjectsArr.map(retrieveImgUrls)
		
		 onlyImgs = imgURLS.filter(isAnImg)
		results = onlyImgs.map(convertGif);
		// return convertedGifs;
		return results;

	})
	.then(function(){
		//get rid of old slieshow
		let oldSlides = document.querySelector("img");
		if(oldSlides){
			clearInterval(slideshow);
			document.body.removeChild(oldSlides);
		}
		currentIndex = 0;
		let firstPhoto = document.createElement("img");
		firstPhoto.src = results[currentIndex];
		document.body.appendChild(firstPhoto);
		slideshow = setInterval(slide, 3000);
		
	})
	.catch(function(error){
		console.log("your thing didnt do the thing right", error);
	});

}


document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM Content has loaded");


//grabfor and add tell it to listen fot the submit event
	document.querySelector("#reddit-form").addEventListener("submit",function(e){
		e.preventDefault();
		let userInput = document.querySelector("#text-field").value;
		// console.log(userInput);
		//storing my api request url with the user inpit inot requesturl variable
		let requestURl = `https://www.reddit.com/search.json?q=${userInput}&limit=100`;
		// console.log(requestURl);
		makeFetchHappen(requestURl);

	})

})