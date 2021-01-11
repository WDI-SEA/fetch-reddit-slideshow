const form = document.getElementById('form')
const slideshowImages = document.getElementById('slideshowImages')
const pauseButton = document.getElementById('pauseButton')
const inputField = document.getElementById('inputField')
const searchStart = document.getElementById('searchPage')
let currentIndex = 0
let slideshow = []
let interval = null

const randomSearch = 'http://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (e)=>{
        
        e.preventDefault()
        console.log(inputField.value)

        fetch(randomSearch+inputField.value+'+nsfw:no')
        .then((fetchImages)=>{
            let jsonData = fetchImages.json()
            console.log(jsonData)
            return jsonData
        })
        .then((redditResponse)=>{
            redditResponse.data.children.forEach(res => {
                slideshow.push(res.data.thumbnail)
            })
            console.log(slideshow)
        })
        .then(() => {
            runSlideshow()
        })
        .catch((err)=>{
            console.log('Failed to fetch users', err)
        })
    })
})

function runSlideshow() {
    searchPage.style.display = 'none'
    searchResults.style.display = 'inline-block'
    setInterval (function() {
        slideshowImages.src = slideshow[currentIndex]
        if (currentIndex < slideshow.length){
            currentIndex++
        } else {
            currentIndex = 0
        }
    }, 2000)
}