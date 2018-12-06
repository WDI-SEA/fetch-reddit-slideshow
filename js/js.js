document.addEventListener("DOMContentLoaded", function(){
	console.log("dom content has loaded");

	const ul = document.getElementById("search-results");


function addRedditPics(data){
	// let li = document.createElement("li");
	let img = document.createElement("img");
	// Example li.textContent = person.name.first, person.name.last;
	// li.textContent = `${person.name.first} ${person.name.last}`;
	img.src = resultUrl;
	// ul.appendChild(li);
	ul.appendChild(img);	
}

	document.getElementById("redditResultsForm").addEventListener("submit", function(e){
		e.preventDefault();

		let userInput = (document.querySelector('input').value);
		let requestURL = `https://www.reddit.com/search.json?q=${userInput}`

		console.log(userInput);

		fetch(requestURL)
			.then(function(responseData){
				return responseData.json();
			})

			.then(function(jsonData){
				console.log(jsonData);
				var childrenArray = jsonData.data.children

            	childrenArray.forEach(function(data){
            		let resultUrl = data.data.url;
            		console.log(resultUrl);
            		resultUrl
				})
            })
            .then(function()resultUrl.forEach(addRedditPics);

			.catch(function(err){
				console.log("error", err);
			})
	})




});





