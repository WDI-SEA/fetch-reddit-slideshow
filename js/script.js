//declare som global variables and const
const API_URL_BASE = 'https://www.reddit.com/search.json?nsfw:no&q=' 
const INTERVAL_DELAY = 2000 //2 second interval delay
let currentImages = []
let currentIndex = 0
let interval = null
//declare some event handlers
//form submit
document.getElementById('search-form').addEventListener('submit', (e) => {
    //prevent the form's b(x) of refreshing the page
    e.preventDefault()
    //grab the user's query
    let userQuery = document.getElementById('query').value
    //mkae sure the user actually typed something
    if (userQuery) {
        console.log('TODO SEARCH')
        fetchReddit(userQuery)
    }
    else {
        console.log('please type something')
    }
    
})
//stop button click
// document.getElementById('stop-button').addEventListener('click', location.reload())
//helper functions
//like the fetch function 
//you'll want to have the key word search to pushed into the url (line 38)
 const fetchReddit = (userQuery) => {
    console.log('you will search reddit for', userQuery)
    //call the redit API using the fetch function 
    fetch(API_URL_BASE + userQuery)
    .then(response => response.json())
    .then(jsonData => {
        //this is the data, here is where we do stuff with it
        let results = jsonData.data.children.filter((item) => {
            item.data.post_hint
            return item.data.post_hint == 'image'
        }).map((item) =>{
            return {
                title: item.data.title,
                url: item.data.url,
                subreddit: item.data.subreddit,
                gold: item.data.gilded > 0
            }
        })
        console.log(results)
        currentImages = results
        startSlideshow()
    })
    .catch(err => {
        console.log('error', err)
    })
 }
//something that kicks off the slideshow(done)
const startSlideshow = () => {
    console.log('start')
    //hide the search bar
    document.getElementById('search-box').style.display = 'none'
    //show the slide show div
    document.getElementById('slideshow').style.display = 'inline-block'
    //display the first image
    displayCurrent()
    //kick off the interval
    interval = setInterval(nextImage, INTERVAL_DELAY)
    clearInterval(interval)
}
//a function that updates the next image
//display current image
const displayCurrent = () => {
    //empty previous images 
    document.getElementById('results').innerHTML =""
    //create an image tag
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    //create an H3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].title
    //place my newly created elmts into the DOM 
document.getElementById('results').append(img)
document.getElementById('results').append(h3)
}
const nextImage = () => {
    currentIndex++
    displayCurrent()
}
