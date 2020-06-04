console.log("💾")

const REDDIT_URL = "http://www.reddit.com/search.json?q=lion+nsfw:no"

let formButton = document.getElementById('form-button')
let something = document.getElementById('slideshow')

var timer = null;
var currentImg = [];
var counter = 0;

//fetch reddit json data (on click)
function redditImg() {
fetch(REDDIT_URL)
    .then(function(response) {
        return response.json()
        // console.log(response.json())
    })
    .then(function(images) {
//acess the data to get images and print on carousel
        let results = images.data.children
        for (i = 0; i < images.data.children.length; i++) {
            if (results[i].data.url.endsWith(".jpg")) {
            currentImg.push(results[i].data.url)
            something.src = results[i].data.url
            // console.log(results[i].data.url)
            }
         } timer = setInterval(scrollImg, 1000)
    })
    .catch()
}
//setInterval for currentImg array

function scrollImg() {
    counter++
    if (counter >= currentImg.length) {
    counter = 0;
    } 
    something.src = currentImg[counter]
}

//preventDefault() form button
document.addEventListener('submit', function(e) {
    e.preventDefault()
})
//on click function
formButton.addEventListener('click', function(e) {
    redditImg()
})