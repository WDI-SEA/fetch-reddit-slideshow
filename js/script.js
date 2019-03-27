document.addEventListener("DOMContentLoaded", main);

//declare constant for search URL
const REQUEST_URL = "https://www.reddit.com/search.json?q="; // search text comes directly after

function main() {
	var button = document.getElementById("searchbutton");
  button.addEventListener("click", searchExeEvents);



	function searchExeEvents() {
		// grab text from textbox
		var searchbox = document.getElementById("searchtext");
		// append textbox text to end of REQUEST_URL constant
		var searchURL = REQUEST_URL + searchbox.value;

		var searchButton = document.getElementById("searchbutton");
		// searchButton.

		// run fetch using complete REQUEST_URL with then statement to console log JSON data
		fetch(searchURL)
			.then(function(responseData) {
				console.log(responseData);
				return responseData.json();
			})
			.then(function(jsonData) {
				console.log(jsonData);
				var imgsrc = [];
				var slideshowHolder = document.getElementById("slideshowholder");
				for (var i = 0; i < jsonData.data.children.length; i++) {
					if (jsonData.data.children[i].data.url.includes("https://i.redd.it")  && jsonData.data.children[i].data.url.includes(".jpg")) {
						imgsrc[i] = jsonData.data.children[i].data.url;
						var slideshowImg = document.createElement("img");
						slideshowImg.src = imgsrc[i];
						slideshowHolder.appendChild(slideshowImg);
					}
				}

				// var imgsrc = jsonData.data.children[0].data.url;
				// console.log(imgsrc);
				// var slideshowHolder = document.getElementById("slideshowholder");
				// // slideshowHolder.removeChild("img");
				// var slideshowImg = document.createElement("img");
				// slideshowImg.src = imgsrc;
				// slideshowImg.setAttribute("src", imgsrc);
				// console.log(slideshowHolder);
				// slideshowHolder.appendChild(slideshowImg);
			})
			.catch(function(error) {
				console.log("error is as follows:");
				console.log(error);
			});



	}



	// end MAIN
}
