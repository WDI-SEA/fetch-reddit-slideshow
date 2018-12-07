let results;
let currentIndex;
let slideshow;


	function retrieveImgUrls(item){
		//return what we want to be in the new array.
		return item.data.url
	}

	function isAnImg(url){
		//creating a new array that only containts urls with i.imgur bc we know these are the imgs that work
		return url.includes("i.imgur")|| url.includes("i.redd");
	}

	function convertGif(onceFilteredUrls){
		return onceFilteredUrls.replace(".gifv", ".gif");
	}

	function slide(){
		if(currentIndex === results.length -1){
			//to reset to 0
			currentIndex = -1;
		}
		currentIndex++;
		//change the src attribute of the img
		let currentImg = document.querySelector("img");
		currentImg.src = results[currentIndex];
	}

	function startCarousel(){
		slideshow = setInterval(function(){
		M.Carousel.getInstance(document.querySelector(".carousel")).next();
		}, 3000)
	}

	function clearsCarousel(){
		let carouselParent = document.querySelector(".carousel");
		while(carouselParent.firstChild){
			carouselParent.removeChild(carouselParent.firstChild);
		}
		clearInterval(slideshow);
	}


	function makeFetchHappen(url){

		let imgUrls, onlyImgs;

		fetch(url)
			.then(function(responseObject){ 
				return responseObject.json();
			})
			.then(function(jsonResults){
				//store the array of results objects
				let resultsObjectsArr = jsonResults.data.children;
				//map the result objects array to an array of just urls from inside the objects
				imgUrls = resultsObjectsArr.map(retrieveImgUrls)
				onlyImgs = imgUrls.filter(isAnImg);
				//replaces my results 
				results = onlyImgs.map(convertGif);
				// return results;

				clearsCarousel();

				results.forEach(function(resultUrl){
					//create an anchor tag
					let newAnchor = document.createElement("a");
					//create an image tag
					let newImg = document.createElement("img");
					//add # href to anchor tag
					newAnchor.href = "#";
					//add class to carousel-item to anchor
					newAnchor.classList.add("carousel-item");
					//add src to the img tag
					newImg.src = resultUrl;
					//append img tag to anchor tag
					newAnchor.appendChild(newImg);
					//append anchor tag to carousel div
					document.querySelector(".carousel").appendChild(newAnchor);
				});
			    var elems = document.querySelectorAll('.carousel');
			    var instances = M.Carousel.init(elems);
			    startCarousel();


			})
			// .then(function(){
				// get rid of old slideshow
				// let oldSlides = document.querySelector("img");
				// if(oldSlides){
				// 	clearInterval(slideshow);
				// 	document.body.removeChild(oldSlides)
				// }

				// currentIndex = 0;
				// let firstPhoto = document.createElement("img");
				// firstPhoto.src = results[currentIndex];
				// document.body.appendChild(firstPhoto);
				// //slideshow needs to start after the first photo, change the sort attribute. (function, millisecs)
				// slideshow = setInterval(slide, 3000);

			// })
			.catch(function(err){
				console.log("Oh no!", err);
			});
	}	

document.addEventListener("DOMContentLoaded", function(){
	console.log("yay");
	//listen for the submit event and prevent it from reloading on submission.
	document.querySelector("#search-form").addEventListener("submit", function(e){
		e.preventDefault();
		//grab user input string
		let userInput = document.querySelector('input').value; //could also use the #id, this shows the first input tag.
		//storing api request url with user input into request url variable
		let requestURL = `http://www.reddit.com/search.json?q=${userInput}&limit=100+nsfw:no`;
		makeFetchHappen(requestURL);
	});
});