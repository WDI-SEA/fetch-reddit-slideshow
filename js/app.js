console.log("script loaded");

// Get the form
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", startSlideshow);
var startButton = document.getElementById("start");
var searchText;
var message = document.getElementById("result-message");
var resultMessage = document.getElementById("result");
var images = [];
var titles = [];
var currentImage = 0;
var imageInterval;
var prevImagePane = document.getElementById("prev-image");
var currentImagePane = document.getElementById("current-image");
var nextImagePane = document.getElementById("next-image");



function startSlideshow(event) {
	event.preventDefault();
	clearInterval(imageInterval);

	searchText = document.getElementById("query").value;
	if (searchText) {
		searchUrl = "http://www.reddit.com/search.json?q=" + searchText + "+nsfw:no";
		fetch (searchUrl)
		.then((responseData) => {
			return responseData.json();
		})
		.then((jsonData) => {
			//Getting image urls from search results returned by the query
			//data.children[1].data.url
			for (image of jsonData.data.children) {
				var imgUrl = image.data.url;
				if (isImageUrl(imgUrl)) {
					var imgElement = document.createElement("img");
					imgElement.src = imgUrl;
					images.push(imgUrl);
					titles.push(image.data.title);
				}
			}
			currentImage = images.length;
		})
		startButton.value = "Reset";
		startButton.addEventListener("click", resetSlideshow);
		searchForm.removeEventListener("submit", startSlideshow);
		document.getElementById("query").style.display = "none";
		document.getElementById("query-label").style.display = "none";
	} else {
		return;
	}

	imageInterval = setInterval(nextImage, 1500);
}

function resetSlideshow() {
	startButton.removeEventListener("click", resetSlideshow);
	startButton.addEventListener("click", startSlideshow);
	startButton.value = "Start the slideshow!";
	document.getElementById("query").value = "";
	document.getElementById("query").style.display = "inline";
	document.getElementById("query-label").style.display = "inline";
	searchForm.addEventListener("submit", startSlideshow);
	clearInterval(imageInterval);
}

function isImageUrl(url) {
	var possibleExtension = url.substr(url.length-4, 4);
	switch (possibleExtension) {
		case ".jpg":
		case ".png":
		case ".tif":
		case ".jpg":
			return true;
			break;
		default:
			return false;
	}
}

function nextImage() {
	prevImagePane.innerHTML = "<img class=\"side-image\" src=\"" + images[(currentImage - 1) % images.length] + "\">";
	prevImagePane.innerHTML += "<br /><p>" + titles[(currentImage - 1) % titles.length] + "</p>";
	currentImagePane.innerHTML = "<img class=\"center-image\" src=\"" + images[currentImage % images.length] + "\">";
	currentImagePane.innerHTML += "<br /><p>" + titles[currentImage % titles.length] + "</p>";
	nextImagePane.innerHTML = "<img class=\"side-image\" src=\"" + images[(currentImage + 1) % images.length] + "\">";
	nextImagePane.innerHTML += "<br /><p>" + titles[(currentImage + 1) % titles.length] + "</p>";
	currentImage++;
}