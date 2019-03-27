document.addEventListener("DOMContentLoaded", main)

function main() {
	// Define our API URL
	const REQUEST_URL = "http://www.reddit.com/search.json?q="

	// Make button clickable
	var button = document.getElementById("search")
	button.addEventListener("click", getValue)

	// Get value on button click
	function getValue() {
		var userInput = document.getElementById("input").value
		console.log(userInput)
		// Do your fetch request
		fetch(REQUEST_URL+userInput)
			.then(function(data) {
				console.log("bitch")
				return data.json()
			})
			.then(function(jsonData) {
				var imgSource = jsonData.data.children.map(child => child.data.url)
				postImage(imgSource)

				console.log(jsonData, imgSource)
			})
			.catch(function(error) {
				console.log("oops", error)
			})
		function postImage(imgSource) {
			var box = document.getElementById("slideshow")
			var substring1 = ".jpg"
			var substring2 = "i.reddit"
			for (var i = 0; i < imgSource.length; i++) {
				if (imgSource[i].includes(substring1) || imgSource[i].includes(substring2)) {
					var puppieImg = document.createElement("img")
					puppieImg.src = imgSource[i]
					puppieImg.classList.add("my-slides")
					box.appendChild(puppieImg)
				}
			}
		}
	}
}

	