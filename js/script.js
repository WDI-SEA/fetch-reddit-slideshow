console.log('JS is linked')

let searchBox = document.querySelector('#userInput')
let form = document.querySelector('form')
let search = document.querySelector('#search-button')
let stop = document.querySelector('#stop-button')
let picture = document.querySelector('#picture')
let imgContainer = document.querySelector('.img-container')
let imageUrl = []
let pp = 0
let slideshow
imgContainer.style.display = 'none'

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
})

const showImages = () => {
    pp++
    if (pp < 10) {
        picture.setAttribute('src', imageUrl[pp])
    }
    else {
        pp = 0
    }
}

const searchImages = () => {
    let searchInput = document.querySelector('#userInput').value
    let searchInputString = searchInput.toString()
    let requestedUrl = `https://www.reddit.com/search.json?q=${searchInputString}+nsfw:no`
    console.log(requestedUrl)
    fetch(requestedUrl)
        //get thumbnail and push to imageUrl
        .then((responseData) => {
            // console.log(responseData)
            return responseData.json()
        })
        .then((jsonData) => {
            console.log(jsonData)
            // add thumbnail to array using for loop
            for (let i = 0; i < 10; i++) {
                imageUrl
        .push(jsonData.data.children[i].data.thumbnail)
            }
            cycle()
            search.hidden = true
            searchBox.hidden = true
            imgContainer.style.display = 'block'
            console.log(jsonData)
        })
        .catch((error) => {
            console.log(error)
        })
}
// searchImages()

const cycle = () => {
    slideshow = setInterval(showImages, 1500)}
search.addEventListener('click', searchImages)

// stop button
function stopImages() {
    clearInterval(slideshow)
    search.hidden = false
    searchBox.hidden = false
    picture.setAttribute('src', ' ')
    imgContainer.style.display = 'none'
    searchBox.value = ''
    imageUrl = []
}
stop.addEventListener('click', stopImages)