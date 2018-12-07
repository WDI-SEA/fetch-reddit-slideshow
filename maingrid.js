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
	let gridParent = document.querySelector(".row");
	while(gridParent.firstChild){
		gridParent.removeChild(gridParent.firstChild)
	}
	//clearInterval(slideshow);
}

// function loadImages(){
// 	slideshow = setInterval(function(){
// 		M.Carousel.getInstance(document.querySelector('.carousel')).next();
// 	}, 1000);
// }

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
			clearGrid();
			results.forEach(function(resultUrl){
				let gridImg = document.createElement('img');
				gridImg.src = resultUrl;
				var newDiv = $("<div/>")   // creates a div element
                .addClass("col s12 m6 l4")   // add a class
				 console.log(newDiv);
				$(".row").append(newDiv);
				$(newDiv).append(gridImg);
			})
		}
	).catch(function(error){
			console.log("There is an error:", error)
		});
};









