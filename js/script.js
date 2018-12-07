// declare this variable in the global space
let results;
let currentIndex;
let slideshow;

function retrieveImgUrls(item) {
	return item.data.url
};

function isAnImg(url) {
	//useless comment
	return url.includes('i.imgur') || url.includes('i.red');
};

function convertGif(onceFilteredUrl) {
	//parker's method for making gifs work
	return onceFilteredUrl.replace(".gifv", ".gif");
};

function slide(){
	//change the src attribute of image tag
	if(currentIndex === (results.length -1)) {
		currentIndex = -1;
	}
	let currentImage = document.querySelector("img");
	console.log(currentIndex);
	console.log(setInterval.value);
	currentImage.src = results[currentIndex + 1];
	currentIndex++;
}

// function startCarousel(){
// 	slideshow = setInterval(function(){
// 		M.Carousel.getInstance(document.querySelector(".carousel")).next();
// 	}, 3000)
// }

function clearCarousel(){
	let carouselParent = document.querySelector(".carousel");
	while(carouselParent.firstChild) {
		carouselParent.removeChild(carouselParent.firstChild)
	}
	clearInterval(slideshow);
}

function makeFetchHappen(url){

	let imgUrls, onlyImgs, convertedGifs;

	fetch(url)
	.then(function(responseObject){
		console.log(responseObject);
		return responseObject.json();
	})

	.then(function(jsonResults){
		//console.log(jsonResults.data.children[0].data.url);
		//below: store the array of search results
		let resultsObjectsArr = jsonResults.data.children;
		//map the result objects array to an array of just urls we grab from inside those objects
		imgUrls = resultsObjectsArr.map(retrieveImgUrls)
		onlyImages = imgUrls.filter(isAnImg);
		results = onlyImages.map(convertGif);

		clearCarousel();

		results.forEach(function(resultUrl){
			//create an anchor tag
			let newAnchor = document.createElement("a");

			//create an image tag
			let newImg = document.createElement("img");

			//add # href to anchor tag
			newAnchor.href = "#";

			//add carousel item class to anchor
			newAnchor.classList.add("carousel-item");

			//add src to img tag
			newImg.src = resultUrl;

			//append img tag to anchor tag
			newAnchor.appendChild(newImg);
			console.log(document.querySelector(".carousel"))
			//append anchor tag to carousel div
			document.querySelector(".carousel").appendChild(newAnchor);

		});
	    var elems = document.querySelectorAll('.carousel');
	    var instances = M.Carousel.init(elems);
	    // startCarousel();
	})



	.catch(function(error) {
		console.log("you messed up:", error);
	})

}

document.addEventListener("DOMContentLoaded", function() {
	console.log("the DOM has arrived");
	document.querySelector("#reddit-form").addEventListener("submit", function(e){
		e.preventDefault();

		let userInput = document.querySelector("#text-field").value;
		console.log(userInput);

		// storing API request url with the user input ino requestUrl variable
		let requestUrl = `https://www.reddit.com/search.json?q=${userInput}&limit=100`;
		console.log(requestUrl);
		makeFetchHappen(requestUrl);
	})

})






