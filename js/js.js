// Declare constants:
const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2500
let currentImages = []
let currentIndex = 0
let interval = null

document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    let userQuery = document.getElementById('query').value

    if(userQuery){
        fetchReddit(userQuery)
        document.getElementById('query').value = ''
    }
    else{
        console.log(`Hey bucko, that's an empty string.`)
    }
})

document.getElementById('stop-button').addEventListener('click', () => {
    document.getElementById('slideshow-container').style.visibility = 'hidden'
    document.getElementById('form-container').style.display = 'block'
    clearInterval(interval)
})

const fetchReddit = (query) => {
    console.log('Fetching: ', query)
    fetch(API_URL + query)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData.data)
        currentImages = jsonData.data.children.map(pic => {
            return {
                title: pic.data.title,
                url: pic.data.url,
                subreddit: pic.data.subreddit,
                upvotes: pic.data.ups,
                gold: pic.data.gilded > 0 ? true : false,
                postHint: pic.data.post_hint
            }
        })
        .filter(pic => {
            return pic.postHint === 'image'
        })
        console.log('Cleaned up posts: ', currentImages)
        startSlideshow()
    })
    .catch(err => {
        console.log('ERROR: ' + err)
    })
}

const startSlideshow = () => {
    currentIndex = 0

    placeImage()
    document.getElementById('form-container').style.display = 'none'
    document.getElementById('slideshow-container').style.visibility = 'visible'
    interval = setInterval(changeImage, INTERVAL_DELAY)
}

const changeImage = () => {
    currentIndex ++

    if(currentIndex >= currentImages.length){
        currentIndex = 0
    }

    placeImage()
}

const placeImage = () => {
    //Empty the result div, in case it has any content
    document.getElementById('result').innerHTML = ''
    // Create an img tag
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    // Create an h2 tag to hold the image title
    let h2 = document.createElement('h2')
    h2.textContent = currentImages[currentIndex].title + (currentImages[currentIndex].gold? ' 🥇🏆' : '')
    // Create an h3 tag to hold the subreddit name
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].subreddit
    // Add the created elements to my HTML page!
    document.getElementById('result').append(img)
    document.getElementById('result').append(h2)
    document.getElementById('result').append(h3)
}