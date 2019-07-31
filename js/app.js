console.log("I'm loaded");

document.getElementById("photo-form").addEventListener("submit", function(event){
	event.preventDefault();
	console.log("Form submitted");
	var searchQuery = document.getElementById("query").value;

	if (searchQuery) {
		console.log(searchQuery);
		document.getElementById("no-query").textContent = " ";

		//search for the photos
		fetch("https://www.reddit.com/search.json?q="+searchQuery)
		.then(function(responseData) {
			console.log(responseData);
			return responseData.json();
		})
		.then(function (jsondata) {
			console.log(jsondata);
			jsondata.data.children.forEach(function(listing) {
				let divContainer = document.createElement("div");

				let image = document.createElement("img");
				image.src = listing.data.thumbnail;


				divContainer.append(image);

				document.getElementById("result").append(divContainer);
			})
		})

	} else {
		
		document.getElementById("no-query").textContent = "Nothing happened";
	}
})