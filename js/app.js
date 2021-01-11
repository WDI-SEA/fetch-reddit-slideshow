const form = document.getElementById('form')
const slideshowImages = document.getElementById('slideshowImages')
const pauseButton = document.getElementById('pauseButton')
const inputField = document.getElementById('inputField')
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
    slideshowImages.style.display = 'inline-block'
    setInterval (function() {
        slideshowImages.src = slideshow[currentIndex]
        if (currentIndex < slideshow.length){
            currentIndex++
        } else {
            currentIndex = 0
        }
    }, 2000)
}

// Hide search page
// Display results page and run slideshow

// **** NICK'S EXAMPLE ****

// const searchForm = document.getElementById('form')
// const show = document.getElementById('slideshowImages')
// const stopButton = document.getElementById('pauseButton')
// const searchInput = document.getElementById('inputField')
// let slideshow = []
// let currentIndex = 0
// let interval = null

// const randomSearch = (searchterm) => {
//     fetch(`http://www.reddit.com/search.json?q=${searchterm}+nsfw:no`)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result.data.children)
//         let photosOnly = result.data.children.filter(child => {
//             return child.data.post_hint === 'image'
//         })
//         slideshow = photosOnly
//         console.log(slideshow)
//     })
//     .then(() => {
//         startShow()
//     })
//     .catch((error) => console.log(error))
// }

// const search = (e) => {
//     e.preventDefault()
//     randomSearch(searchInput.value)
// }

// const startShow = () => {
//     let searchImg = document.createElement('img')
//     searchImg.src = slideshow[currentIndex].data.result
//     searchImg.alt = slideshow[currentIndex].data.title
//     show.append(searchImg)
//     // interval = setInterval(() => {
//     //     currentIndex++
//     //     if(currentIndex > slideshow.length -1){
//     //         currentIndex = 0
//     //     }
//     //     searchImg.src = slideshow[currentIndex].data.result
//     //     searchImg.alt = slideshow[currentIndex].data.title
//     // }, 2000)
// }

// const stopShow = () => {
//     currentIndex = 0
// }

// // fetchReddit('cats')
// searchForm.addEventListener('submit', search)