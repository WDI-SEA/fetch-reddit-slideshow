//variables needed
let greeting = document.querySelector('.title')
let searchBox = document.querySelector('#input')
let search = document.querySelector('#search')
let stop = document.querySelector('#stop')
let picture = document.querySelector('#picture')
let container = document.querySelector('.container')
let imageLink = []
let pp = 0
let slideshow;
container.style.display = 'none'
// function that makes the slideshow appear, called with setInterval
const showImages = () => {
    pp++    //cycles the link used for the images using the array values
    if (pp < 10) {
        picture.setAttribute('src', imageLink[pp])
    }
    else {
        pp = 0
    }
    //add a div
    //add an id to the div 
    //put the image into that div
}
//function to make the search stuff work
const searchImages = () => {
    let searchInput = document.querySelector('#input').value
    let searchInputString = searchInput.toString()
    let requestedUrl = `https://www.reddit.com/search.json?q=${searchInputString}+nsfw:no`
    console.log(requestedUrl)
    fetch(requestedUrl)
        //gets the thumbnail link and pushes it into imageLink
        .then((responseData) => {
            console.log(responseData)
            return responseData.json()
        })
        .then((jsonData) => {
            console.log(jsonData)
            // for loop to add the thumbnails to array
            for (let i = 0; i < 10; i++) {
                //push the link into the array 
                imageLink.push(jsonData.data.children[i].data.thumbnail)
            }
            cycle()
            search.hidden = true
            searchBox.hidden = true
            greeting.hidden = true
            container.style.display = 'block'
            console.log('json data')
            console.log(jsonData)
        })
        .catch((error) => {
            console.log('error')
            console.log(error)
        })
}
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
})

const cycle = () => { slideshow = setInterval(showImages, 2000) }
search.addEventListener('click', searchImages)

//function to make the button work
function stopImages() {
    clearInterval(slideshow)
    search.hidden = false
    searchBox.hidden = false
    greeting.hidden = false
    picture.setAttribute('src', '')
    container.style.display = 'none'
    searchBox.value = ''
    imageLink = []
}
stop.addEventListener('click', stopImages)
