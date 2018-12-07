let results;
let currentIndex;
let slideshow
function getImgUrls(item) {
	return item.data.url;
}

function imgURL (url){
	return url.includes("i.imgur") || url.includes("i.redd");
}

function convertGif(oncefilteredURL) {
	return oncefilteredURL.replace("gifv", ".gif");
}

function startCarousel(){
	slideshow = setInterval(function(){
		M.Carousel.getInstance(document.querySelector(".carousel")).next();
	}, 3000)
}

function slide(){
	if(currentIndex===results.length-1){
		currentIndex = -1;
	}
	let currentImg = document.querySelector("img");
	currentImg.src = results[currentIndex];
}

function clearsCarousel(){
	let carouselParents = document.querySelector(".carousel");
	while(carouselParents.firstChild){
		carouselParents.removeChild(carouselParents.firstChild)
	}
	clearInterval(slideshow);
}

function fetchImg(url) {
	let imgUrls, onlyImgs;
	fetch(url)
	.then(function(responseObject){
		return responseObject.json();

	})

	
	.then(function(jsonResults){
		let resultsObjectsArr = jsonResults.data.children;
		imgUrls = resultsObjectsArr.map(getImgUrls)
		onlyImgs = imgUrls.filter(imgURL)
		results = onlyImgs.map(convertGif);
		results.forEach(function(resultUrl){
			let newAnchor = document.createElement("a");
			let newImg = document.createElement("img");
			newAnchor.href = "#";
			newAnchor.classList.add("carousel-item");
			newImg.src = resultUrl;
			newAnchor.appendChild(newImg);
			console.log(document.querySelector(".carousel"))
			document.querySelector(".carousel").appendChild(newAnchor);
	});

		var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
    startCarousel()

	})





	.then(function(){
		// let badSlides = document.querySelector("img");
		// if (badSlides){
		// 	clearinter(slideshow);
		// 	document.body.removeChild(badSlides);
		// })
		// currentIndex = 0;
		// let firstPhoto = document.createElement("img");
		// firstPhoto.src = results[currentIndex];
		// document.body.appendChild(firstPhoto);
		// slideshow = setInterval(slide, 3000);
	})	

	.catch(function(error){
		console.log("your thing didnt do the thing right", error);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM Content has loaded");

document.querySelector("#reddit-form").addEventListener("submit", function(e){
e.preventDefault();
let userInput = document.querySelector("#text-field").value;
let requestURL = `https://www.reddit.com/search.json?q=${userInput}&limit=100`;
fetchImg(requestURL);
})



})


