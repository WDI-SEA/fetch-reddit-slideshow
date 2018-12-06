document.addEventListener("DOMContentLoaded", function(){
	console.log("yay");
	//instead of immediately loading the tags, store results array into a variable declared 

	//use this main results to store but can also use to clear.
	//need to use set interval to change src tag or carousel to spin on a set interval 

	const resultsArr = [];
	const ul = document.getElementById("search-results");

	function addImg(picture){
		let li = document.createElement("li");
		let img = document.createElement("img");
		img.src = picture.url;
		ul.appendChild(li).appendChild(img);
	}

	document.getElementById("search-form").addEventListener("submit", function(e){
		e.preventDefault();
		console.log(document.querySelector('input').value);
		let userInput = document.querySelector('input').value;
		let requestURL = `http://www.reddit.com/search.json?q=${userInput}+nsfw:no`;
		

	fetch(requestURL)
		.then(function(responseData){
			return responseData.json();
		})
		.then(function(jsonData){
			console.log(jsonData.data.children[0].data[1].thumbnail);
			// console.log(jsonData[0].data.children.data.preview.images[0].url); 
			// var imgOnly = jsonData.filter(function(pic){
			// 	return pic[0].data.children.data.preview.images[0].url == ".jpg" || ".png" || ".gif" {
			// });
			// jsonData.forEach(addImg);
		})
		.catch(function(err){
			console.log("Oh no!", err);
		});
	});
});