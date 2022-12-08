
let images = []
let imageIndex = -1
let value = ''
let slideshowInterval

let formContainer, searchForm, searchInput, stopButton, slideshowContainer


function fetchReddit(e) {
    e.preventDefault()
    h1.innerText = null
    value = searchInput.value
    console.log(value)
    if (value === '') {
        searchInput.placeholder = 'Type in here'
        return
    }
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(anything => anything.json())
        .then(redditJson => {
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        author: child.data.author,
                        ups: child.data.ups,
                        subreddit: child.data.subreddit
                    }
                }).filter(image => {
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension === '.png'
                })
            slideshow()
            slideshowInterval = setInterval(slideshow, 1500)
            formContainer.style.display = 'none'
            stopButton.style.display = 'inline'

        })
        .catch(console.warn)
}

function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function stop() {
    clearInterval(slideshowInterval)
    clearElement(slideshowContainer)
    stopButton.style.display = 'none'
    formContainer.style.display = 'block'
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    imageIndex++
    if (imageIndex >= images.length) {
        imageIndex = 0
    }

    clearElement(slideshowContainer)
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    newSubP.setAttribute('id', 'style')
    const newUpsP = document.createElement('p')
    newUpsP.setAttribute('id', 'style2')
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '300'
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
}

document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideshowContainer = document.querySelector('#slideshowContainer')
    searchForm.addEventListener('submit', fetchReddit)
    stopButton.addEventListener('click', stop)
    stopButton.style.display = 'none'

    h1 = document.querySelector('#h1')
    
    console.log(h1)

})
