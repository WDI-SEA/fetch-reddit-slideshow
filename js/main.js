// grab DOM elements + declare variables
const title = document.querySelector('h1')
const form = document.querySelector('form')
const input = document.querySelector('#userInput')
const stopButton = document.querySelector('#stop')
const slideshowContainer = document.querySelector('#slideshow')
let slideshow = null
let slideIndex = 0

// add form event listner
form.addEventListener('submit', e => {
    // no refresh
    e.preventDefault()
    // fetch
    const redditSearch = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(redditSearch)
        // jsonify
        .then(response => {
            // console.log(response)
            return response.json()
        })
        // do stuff with the json
        .then(searchJson => {
            // console.log(searchJson)
            const imagePosts = searchJson.data.children.filter(filterImages)
            const imageURLs = imagePosts.map(mapURLs)
            // console.log(imagePosts, imageURLs)
            title.classList.add('hidden')
            form.classList.add('hidden')
            stopButton.classList.remove('hidden')
            prepSlides(imageURLs)
            showSlides()
        })
        // because I am a good progamer
        .catch(error => {
            console.warn(error)
            const errorMsg = document.createElement('p')
            errorMsg.innerText = "Oh no! Something went wrong with the fetch request"
            slideshowContainer.append(errorMsg)
        })
})

// stop slideshow
stopButton.addEventListener('click', () => {
    clearTimeout(slideshow)
    stopButton.classList.add('hidden')
    title.classList.remove('hidden')
    form.classList.remove('hidden')
    while (slideshowContainer.firstChild) {
        slideshowContainer.removeChild(slideshowContainer.firstChild)
    }
})

// filter out image posts? -- barely any images actually match. is it my fault or reddits search algo's fault
function filterImages(value) {
    return value.data.post_hint === "image"
}

// map out the image posts' urls
function mapURLs(value) {
    return value.data.url
}

// create image slides
function prepSlides(array) {
    array.forEach(value => {
        const image = document.createElement('img')
        image.src = value
        image.classList.add('slides', 'hidden')
        slideshowContainer.appendChild(image)
    })
}

// display image slides
function showSlides() {
    let slides = document.querySelectorAll('.slides')
    // make sure all slides are hidden
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden')
    }
    slideIndex++ // increment index number so that a new slide is shown
    // start slideshow over
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    // show specific slide
    slides[slideIndex - 1].classList.remove('hidden')
    // set the timeout
    slideshow = setTimeout(showSlides, 5000)
}