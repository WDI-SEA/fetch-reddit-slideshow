console.log('what up')
const stopBtn = document.getElementById('stop')
let images = []
const redditEndpoint = 'https://www.reddit.com/search.json?q='
const inputBox = document.getElementById('input')
const picTube = document.getElementById('screen')
let slideIndex = 0
let slides;


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




