/* ----------------------- Declare global variables and constants ----------------------- */
const API_URL_BASE = 'http://www.reddit.com/search.json?nsfw:no&q='
const INTERVAL_DELAY = 3500
let currentImages = []
let currentIndex = 0
let interval = null

/* ----------------------- Form submit ----------------------- */
document.getElementById('search-form').addEventListener('submit', (e) => {
/* -----------------------  Prevent the forms behavior of refreshing the page ----------------------- */
    e.preventDefault()

/* ----------------------- Grab the users query ----------------------- */
    let userQuery = document.getElementById('query').value
    console.log('You clicked the form', userQuery)

    if (userQuery) {
        fetchReddit(userQuery)
    }
    else {
        console.log('please type something')
    }
})

/* ----------------------- Stop button ----------------------- */
document.getElementById('stop-button').addEventListener('click', () => {
/* ----------------------- Stop timer ----------------------- */
clearInterval(interval)
/* ----------------------- hide slideshow ----------------------- */
document.getElementById('slideshow').style.display = 'none'
/* ----------------------- Show search bar ----------------------- */
document.getElementById('search-box').style.display = 'inline-block'
/* ----------------------- Set current index back to zero ----------------------- */
currentIndex = 0
})
/* ----------------------- Functions ----------------------- */
const fetchReddit = (userQuery) => {
    console.log('you will search reddit for', userQuery)

/* -----------------------  Call the reddit API ----------------------- */
    fetch(API_URL_BASE + userQuery)     
    .then((response) => {           //.then(response => response.json())
        return response.json()
    })
    .then(jsonData => {
        let results = jsonData.data.children.filter((item) => {
            return item.data.post_hint == 'image'
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
        currentImages = results
        startSlideshow()
    })

    .catch(err => {
        console.log('Error', err)
    })
}

/* -----------------------  Start the slideshow ----------------------- */
const startSlideshow = () => {
    console.log('starting slideshow')
/* -----------------------  Hide the seach bar ----------------------- */
    document.getElementById('search-box').style.display = 'none'
/* -----------------------  Show the slide show div ----------------------- */
    document.getElementById('slideshow').style.display = 'inline-block'
/* -----------------------  Display the first image ----------------------- */
    displayCurrent()
/* -----------------------  Kick off the interval ----------------------- */
    interval = setInterval(changeImage, INTERVAL_DELAY)
}

/* ----------------------- Interval tick ----------------------- */
const changeImage = () => {
/* ----------------------- Update current image being shown ----------------------- */
   currentIndex += 1
   if (currentIndex >= currentImages.length) {
       currentIndex = 0
   }
/* ----------------------- Place that image and data into the DOM ----------------------- */
   displayCurrent()
}

/* ----------------------- Display current image ----------------------- */
const displayCurrent = () => {
/* ----------------------- Empty previous images  ----------------------- */
    document.getElementById('results').innerHTML = ''

/* ----------------------- Create an image tag ----------------------- */
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title

/* ----------------------- Create an h3 to hold the title ----------------------- */
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].title

/* -----------------------  Place newly created elements into the DOM ----------------------- */
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
}