//Declaration of variables
const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2000

let currentImages = []
let currentIndex = 0
let interval = null



// event listeners
document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    //getting the user input from the submit box

    let userQuery = document.getElementById('query').value

    if (userQuery) {
        fetchFromReddit(userQuery)
        document.getElementById('query').value = ''
    }else{
        console.log('Empty String')
    }
})
const placeImage = () => {
    document.getElementById('result').innerHTML = ''

    //create image tags in the document
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title

    let h2 = document.createElement('h2')
    h2.textContent = currentImages[currentIndex].title

    let h3 = document.createElement('h3')
    h3.textContent = 'r/' + currentImages[currentIndex].subreddit
    h3.style.fontFamily = 'Helvetica'
    
    document.getElementById('result').append(img)
    document.getElementById('result').append(h2)
    document.getElementById('result').append(h3)
}
const changeImage = () => {
    //changes index interval by one
    currentIndex++

    if(currentIndex >= currentImages.length){
        currentIndex = 0
        
    } 
    placeImage()
}
document.getElementById('stop-button').addEventListener('click', () =>{
    document.getElementById('slideshow-container').style.visibility = 'hidden'
    document.getElementById('form-container').style.display = 'block'
    
    clearInterval(interval)
})

    // call the fetch arguments with
// the then statements
const fetchFromReddit = query => {
    //preform the fetch 
    console.log('doing the fetch', query)
    fetch(API_URL + query)
    .then(response => response.json())
    .then(jsonData =>{
        // consolidate data into only what we need / care about
        currentImages = jsonData.data.children.map(p => {
            return {
            title: p.data.title,
            url: p.data.url,
            subreddit: p.data.subreddit,
            posthint: p.data.post_hint
        }
    }).filter(p => {
        return p.posthint === 'image'
    })
    console.log('cleaned up posts', currentImages)
    startSlides()
    })
        .catch(err => {
            console.log('Error', err)    
    })
}

const startSlides = () => {
    console.log('slides a sliding')
    //set image array index to first image
    currentIndex = 0;

    placeImage()
    
    document.getElementById('form-container').style.display = 'none'
    document.getElementById('slideshow-container').style.visibility = 'visible'

    interval = setInterval(changeImage, INTERVAL_DELAY)

    

        placeImage()
    }
    
