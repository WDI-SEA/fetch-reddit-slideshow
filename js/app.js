let inputValue;

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();

	let endpoint = 'http://www.reddit.com/search.json?q=cats+nsfw:no';

	fetch(endpoint).then((fetchObj) => fetchObj.json()).then((jsonData) => {
		console.log(jsonData.data.children);
		console.log(jsonData.data.children[1].data.url);

		// store this in a variable
		// map ov to return only urls of objects
		// look for patterns use includes method
		// here i can get access to urls
		// use filter method
		console.log(jsonData.data.children.length);
		let newImg = document.createElement('img');
		document.querySelector('.imgWrapper').appendChild(newImg);
		// for (let i = 0; i < jsonData.data.children.length; i++) {
		// 	newImg.src = jsonData.data.children[i].data.url;
		// }
		newImg.src = jsonData.data.children[3].data.url;
		inputValue = document.getElementById('search').value;
		console.log(inputValue);
	});
});
