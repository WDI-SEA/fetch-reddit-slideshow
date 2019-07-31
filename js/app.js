console.log("script loaded");

// Get the form
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", startSlideshow);
var searchText;
var message = document.getElementById("result-message");
var resultMessage = document.getElementById("result");

function startSlideshow(event) {
	console.log("started slideshow");
	event.preventDefault();
	searchText = document.getElementById("query").value;
	if (searchText) {
		console.log("searching for", searchText);
		searchUrl = "http://www.reddit.com/search.json?q=" + searchText + "+nsfw:no";
		fetch (searchUrl)
		.then((responseData) => {
			return responseData.json();
		})
		.then((jsonData) => {
			console.log(jsonData);
		})
	} else {
		message.innerHTML = "<h2>Enter some keyword text to search for</h2>";
	}
}