const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('user-input')


//Form Event Listener
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const searchTerm = searchInput.value
	//Check if Blank
	if (searchTerm) {
		//Search Reddit
		searchReddit(searchTerm)
	}
	else {
		//Show Error Message if searchTerm is Blank
		showErrorMessage('Please add a search term', 'alert')
	}
})

//Reddit search and return array of images to redditImages
const searchReddit = function(searchTermFromUserClick) {
	console.log("fetching from Reddit ....")
	fetch(`http://www.reddit.com/search.json?q=${searchTermFromUserClick}&sort=relevance+nsfw:no`)
	.then(response => response.json())
	.then (data => {
		let results = [data.data.children.map(data => data.data.url)]
		console.log(results)
		results.forEach((imageURL, time) => {
			setTimeout(() => {
				document.getElementById('image').src = imageURL
			}, time * 3000)
		})

	})
	.catch(err => {
		console.log('Error')
		console.log(err)
	})
}


//Show Error Message
function showErrorMessage(message, className) {
	//Create Div
	const div = document.createElement('div')
	//Add Class
	div.className = className
	//Add Text
	div.appendChild(document.createTextNode(message))
	//get parent container
	const searchContainer = document.getElementById('search-container')
	//get search
	const search = document.getElementById('form-holder')
	//Insert Message
	searchContainer.insertBefore(div, search)
	//Timout alert
	setTimeout(()=>{
		document.querySelector('.alert').remove()
	}, 3000)
}



	
