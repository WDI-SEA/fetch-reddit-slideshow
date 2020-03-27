//declare global variable and constants
const API_URL_BASE = 'http://www.reddit.com/search.json?q='
const INTERVAL_DELAY = 2000
let currentImages = []
let currentIndex = 0
let interval = null

//declare event handlers
var inputBox = document.getElementById('query')
var stopBtn = document.getElementById('stop-button')
var startBtn = document.getElementById('start')
var resultsTag = document.getElementById('results')

//form submit
document.getElementById('search-form')/addEventListener('submit', (e) => {
    e.preventDefault()

    //grab the user query
    let userQuery = document.getElementById('query').value
    // console.log('you clicked the form!', userQuery)


    //make sure the user actually typed something in the box
    if (userQuery) {
        //good query, so perform the search
        fetch(API_URL_BASE + userQuery)
        .then(response => response.json())
        .then(jsonData => {
            //this s the data, here is ehre we do stuff with it
            let results = jsonData.data.children.filter((item) => {
                // console.log(item.data.post_hint)
                return item.data.post_hint == 'image'
            }).map((item) => {
                return {
                    title: item.data.title,
                    url: item.data.url,
                    subreddit: item.data.subreddit,
                    upvotes: item.data.ups,
                    downvotes: item.data.downs
                }

            })
            currentImages = results
            startSlideshow()
        })
        .catch(err => {
            console.log('error', err)
        })
    }
    else {
        console.log('please type something')
    }
}) 

//start slideshow
const startSlideshow = () => {
    //hide the search bar
    document.getElementById('search-box').style.display = 'none'

    //show the slideshow div
    document.getElementById('slideshow').style.display = 'inline-block' 
    //display first image
    displayCurrent()

    //kick off the interval
    interval = setInterval(displayNext, 3000)
}




//display current image
const displayCurrent = () => {
    //empty previous image

    //create an image tag
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    img.setAttribute('id', 'img'+[currentIndex])

    //create an H3 to hold the title
    let h3 = document.createElement('h3' + [currentIndex])
    h3.textContent = currentImages[currentIndex].title
    h3.setAttribute('id', 'title' + [currentIndex])

    //place my newly created element into the DOM
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
    // document.getElementById('title' + [currentIndex]).remove()
}

const displayNext = () =>{
    //remove img tag
    document.getElementById('title' + [currentIndex]).remove()
    document.getElementById('img' + [currentIndex]).remove()
    let img = document.createElement('img')
    img.src = currentImages[currentIndex + 1].url
    img.alt = currentImages[currentIndex + 1].title
    img.setAttribute('id', 'img'+[currentIndex + 1] )


    //create an H3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex + 1].title
    h3.setAttribute('id', 'title' + [currentIndex + 1])

    //place my newly created element into the DOM
    document.getElementById('results').append(img)
    document.getElementById('results').append(h3)
    currentIndex++
}

//clear images function
const clearDisplay = () => {
    clearInterval(interval)
    document.getElementById('search-box').style.display = 'inline-block'
    document.getElementById('slideshow').style.display = 'none'
    inputBox.value = ''
    
}   

//stop button click
stopBtn.addEventListener('click', clearDisplay)



//helper function
//the fetch function
// const fetchReddit = (userQuery) => {
//     console.log('You will search reddit for', userQuery)
// }


