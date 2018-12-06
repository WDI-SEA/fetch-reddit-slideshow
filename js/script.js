document.addEventListener("DOMContentLoaded", function() {
	console.log("the DOM has arrived");

	let slideArray = [];

	const ul = document.getElementById("search-results");

	function showRedditPic(picUrl) {
		let li = document.createElement("li");
		let img = document.createElement("img");
		img.src = picUrl;
		console.log('show picture');
		ul.appendChild(li);
		ul.appendChild(img);
	};

	document.getElementById("slide-form").addEventListener("submit", function(e){
	e.preventDefault(); 

		let userInput = document.querySelector('input').value;

		let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no`;

		console.log(requestURL);


		fetch(requestURL)
			.then(function(responseData){
				return responseData.json();
			})
			.then(function(jsonData){

				let counter = 0;

				for (i=0; i<jsonData.data.children.length; i++) {
					if (jsonData.data.children[i].data.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
						slideArray.push(jsonData.data.children[i].data.url);
					};
				};
				for (i=0; i<slideArray.length; i++) {
					currentPic = slideArray[i];
					setInterval(showRedditPic(currentPic), 3000);
		};
				
			})
			.catch(function(err){
				console.log('oh no! error!', err);
			});
		});
		

	});





