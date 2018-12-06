document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM Content has loaded")

const imgArr = (arrIncludes[".jpg"]), (arrIncludes[".png"]), (arrIncludes["gif"])
	document.querySelector("reddit-form").addEventListener("submit", function(e){
	e.preventDefault();
	let li = document.createElement("li");
	let userInput = documentquerySelector("#text-field").value;
	let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no`;

	function searchpics(pics){
		let img = document.createElement("img");
		img.src = imaged.data.url;
		ul.appendChild(li).appendChild(img);
	};
})



fetch(requestURL)
.then(function(responseData){
	return responseData.json();
})
.then(function(jsonData){

})
.catch()







});


