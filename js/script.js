const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
//declare stuff
const INTERVAL_DELAY = 2000;
let currentImages = []
let currentIndex = 0;
let interval = null;





document.getElementById('formy').addEventListener('submit', (e) => {
	//dont refrsh page
	e.preventDefault()

	let userInput = document.getElementById('search').value
	if (userInput) {
		//User put input in, can perform search
		fetchReddit(userInput)
	} else {
		document.getElementById('askForStuff').textContent = 'Please put in a query'
	}
})

document.getElementById('stopBtn').addEventListener('click', (e) => {
	console.log('stop')
	clearInterval(interval)
	document.getElementById('search-box').style.display = 'inline-block'
	document.getElementById('display').style.display = 'none'
	currentIndex = 0;

})	

const fetchReddit = (userInput) => {
	//cal reddit API, using fetch
	fetch(API_URL + userInput)
	.then(response => response.json())
	.then(jsonData => { //first root of API
		let results = jsonData.data.children.filter((item) => { //take this varible as current root
			return item.data.post_hint == 'image' //now filter data => post_hint value == image
		}).map((item) => {
			return {
				title: item.data.title,
				url: item.data.url,
				subreddit: item.data.subreddit,
				upvotes: item.data.ups,
				downvotes: item.data.downs,
				gold: item.data.gilded > 0
			}
		})
		console.log(results)
		currentImages = results;
		startSlides()
	})
	.catch(err => {
		console.log('error', err)
	})	
}

const startSlides = () => {
	console.log('Lets get rollin')
	//hide seardh bar
	document.getElementById('search-box').style.display = 'none'
	document.getElementById('display').style.display = 'inline-block'
	//call function to display results
	showCurrent()
	interval = setInterval(showCurrent, INTERVAL_DELAY)
	//show slideshow div
	//display first image
	//kick off interval
}


const showCurrent =() => {
	//empty previous images
	if (currentIndex >= currentImages.length) {
		console.log('end')
		currentIndex = 0
		document.getElementById('results').innerHTML = ''
	}
		
	else if (currentIndex > 0) { 
		 document.getElementById('results').innerHTML = ''
	}
	
	//create img tag
	let img = document.createElement('img')
	img.src = currentImages[currentIndex].url
	img.alt = currentImages[currentIndex].title

	//create h3 to hold title
	let h3 = document.createElement('h3')
	h3.textContent = currentImages[currentIndex].title;

		//place stuff in results div
		document.getElementById('results').append(img)
		document.getElementById('results').append(h3)

	currentIndex++
}





