// create a redditEndPoint for some types of searches you want on site
console.log('what up')
const stopBtn = document.getElementById('stop')
let images = []
const redditEndpoint = 'https://www.reddit.com/search.json?q='
const inputBox = document.getElementById('input')
const picTube = document.getElementById('screen')
let slideIndex = 0
let slides;
// console.log(inputBox.value)
// const randomRedditEndpoint = 'https://reddit.com/search.jsonq?=dogs'
// const randomRedditEndpoint = 'https://reddit.com/search.jsonq?=birds'
// create lists in JS for the images to be put in

// when user types what they want to search in the input bar and click
// search images of what they are searching for should appear.

// got it to fetch the ojbect now to put it on screen

form.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(redditEndpoint + inputBox.value)
    .then((fetchObj) => {
        return fetchObj.json()
    })
    .then((jsonData) => {
        jsonData.data.children.forEach((result) => {
            if(result.data.thumbnail != 'default' && result.data.thumbnail != 'self') {
                images.push(result.data.thumbnail)
            }
        })  
        console.log(images)
        slides = setInterval(() => {
            slideShow()
        }, 500);
    })
    .catch((error => {
        console.log('oh no you did NOt make fetch happen')
    }))
})

function slideShow() {
    picTube.src = images[slideIndex]
    if(slideIndex < images.length-1) {
        slideIndex++
    } else {
        slideIndex = 0
    }
} 



function stopSlideShow(){
    clearInterval(slides)
}

stopBtn.addEventListener('click', () => {
    stopSlideShow()
}) 

// const doSomething = (pizza) => {
//     pizza.preventDefault()
//     console.log('pizza the hut')
// }

// form.addEventListener('submit',(pizza) => {
//     pizza.preventDefault()
//     console.log('pizza the hut')
// } )

// create event listener to listen for a submit event

