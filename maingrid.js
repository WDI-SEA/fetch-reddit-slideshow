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

function clearGrid(){
	let carouselParent = document.querySelector(".carousel");
	while(carouselParent.firstChild){
		carouselParent.removeChild(carouselParent.firstChild)
	}
	clearInterval(slideshow);
}

function loadImages(){
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
			console.log(results)
			//clearGrid();
			results.forEach(function(resultUrl){
				let gridImg = document.createElement('img');
				let imgDiv = document.createElement('div');
				gridImg.src = resultUrl;
				let gridFrame = document.querySelector('.row');

var $newDiv = $("<div/>")   // creates a div element
                 .attr("id", "someID")  // adds the id
                 .addClass("someClass")   // add a class
                 .html("<div>stuff here</div>");

$("#somecontainer").append($newDiv);

				
				imgDiv.addClass ="col s6 m4 l3";
				gridFrame.appendChild(imgDiv);
				imgDiv.appendChild(gridImg);
			})
		}
	).catch(function(error){
			console.log("There is an error:", error)
		});
};









