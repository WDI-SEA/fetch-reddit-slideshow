
	function addRedditPics(add){
		let ul = document.getElementById("search-results");
		let resultImg = document.createElement("img");
		resultImg.setAttribute("class", "resultImg");
		resultImg.src = add;
		ul.appendChild(resultImg);	
	}
	

	function retrieveImgUrl(item) {
		return item.data.url;
	}

	function isAnImg(url) {
		return url.includes("i.imgur" || "i.redd");
	}

	function convertGif(oncefilteredUrl){
		return oncefilteredUrl.replace(".gifv", ".gif");
	}

	function makeFetchHappen(url){
	
		fetch(url)
			.then(function(responseObject){
				return responseObject.json(); //contains All of RAW json
			})
			.then(function(jsonResults){
				// Raw json is narrowed to /parent/child/
				let resultsObjectsArr = jsonResults.data.children;
				// change the result of /parent/child/ to a single array
				let imgUrls = resultsObjectsArr.map(retrieveImgUrl)
				// single array is filtered to ... 
				let onlyImages = imgUrls.filter(isAnImg);
				// replaced gifv to gif
				let convertedGif = onlyImages.map(convertGif);
				console.log(convertedGif);
				convertedGif.forEach(addRedditPics);
            })

    		.catch(function(err){
			console.log("error", err);
			});
	}


document.addEventListener("DOMContentLoaded", function(){
	console.log("dom content has loaded");

	document.getElementById("redditResultsForm").addEventListener("submit", function(e){
		e.preventDefault();

		// get user input here
		let userInput = (document.querySelector('input').value);
		// apply user input to modify json query
		let requestURL = `https://www.reddit.com/search.json?q=${userInput}&limit=1000`
		console.log(userInput);
		// call then next step/function
		makeFetchHappen(requestURL);
	})
});
// function filterImg(imgResults){
// 	var jpg = ".jpg"
// 	var png = ".png"
// 	var gif = ""
// }






