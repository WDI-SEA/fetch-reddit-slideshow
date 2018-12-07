let results, currentIndex, slideshow;

document.addEventListener("DOMContentLoaded", function(){
	console.log("DOM is loaded");
	document.querySelector("#reddit-form").addEventListener("submit", function(e){
		e.preventDefault();
	let userInput = document.querySelector("#text-field").value;
	console.log(userInput);
	//storing my API request url with the user input into the requestUrl variable
	let requestURL = `https://www.reddit.com/search.json?q=${userInput}&limit=100`;
	makeFetchHappen(requestURL);
	})
})

function retrieveImageUrls(item){
	//return what we want to be in the new array
	return item.data.url
};

function isAnImage(url){
	//filters to images only
	return url.includes("i.imgur") || url.includes("i.redd");
};

function convertGif(onceFilteredUrl){
	//converts gifv to gif
	return onceFilteredUrl.replace("gifv", "gif")
};

function slide(){
	if(currentIndex==results.length-1){
		currentIndex = -1;
	}
	//change the src attribute of the image tag to the next index of the results array
	currentIndex++;
	let currentImg = document.querySelector('img');
	currentImg.src = results[currentIndex];
	console.log(currentIndex);
}

function clearCarousel(){
	let carouselParent = document.querySelector(".carousel");
	while(carouselParent.firstChild){
		carouselParent.removeChild(carouselParent.firstChild)
	}
	clearInterval(slideshow);
}

function startCarousel(){
	slideshow = setInterval(function(){
		M.Carousel.getInstance(document.querySelector('.carousel')).next();
	}, 1000);
}

function makeFetchHappen(url){
	let imgUrls, onlyImgs;
	fetch(url)
		.then(function(responseObject){
			//console.log(responseObject);
			return responseObject.json();
		})
		.then(function(jsonResults){
			//store the array of result objects
			let resultsObjectArr = jsonResults.data.children
			//store the array of the result objects
			imgUrls = resultsObjectArr.map(retrieveImageUrls);
			onlyImgs = imgUrls.filter(isAnImage);
			results = onlyImgs.map(convertGif);
			clearCarousel();
			results.forEach(function(resultUrl){
				//create an anchor tag
				let newAnchor = document.createElement('a');
				//create an img tag
				let newImg = document.createElement('img');
				//add a dumbie href to the anchor tag
				newAnchor.href = "#"
				//add carousel-item class to new anchor
				newAnchor.classList.add('carousel-item');
				//add src to the img tag
				newImg.src = resultUrl
				//append img tag to the anchor tag
				newAnchor.appendChild(newImg);
				//append anchor tag to carousel div
				document.querySelector(".carousel").appendChild(newAnchor);
			})		
		var elems = document.querySelectorAll('.carousel');
    	var instances = M.Carousel.init(elems);
    	//setInterval(document.querySelector('.carousel').next,3000)
    	startCarousel();
		})
		//.then(function(){
			//get rid of the previous img element from previous searches
			// let oldSlides = document.querySelector('img');
			// if(oldSlides){
			// 	clearInterval(slideshow);
			// 	document.body.removeChild(oldSlides);
			// }
			// currentIndex = 0;
			// //display the first image on the page
			// let firstImg = document.createElement('img');
			// firstImg.src = results[currentIndex];
			// document.body.appendChild(firstImg);
			// slideshow = setInterval(slide, 2000)
		//})
		.catch(function(error){
			console.log("There is an error:", error)
		});
};









