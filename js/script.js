// console.log('hello js')
let images = []
let imageIndex = -1
let value = ""
let slideshowInterval

let formContainer, searchForm, searchInput, stopBtn, slideshowContainer

function fetchReddit (e) {
    e.preventDefault()
    value = searchInput.value
    console.log(value)
    if (value === '') {
        searchInput.placeholder = "type something in to search"
        return
    }
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(redditData => redditData.json())
        .then(redditJson => {
            // console.log(redditJson.data.children)
            images = redditJson.data.children.map(child => {
                return {
                    url: child.data.url,
                    author: child.data.author,
                    ups: child.data.ups,
                    subreddit: child.data.subreddit
                }
            })
            .filter(image => {
                // console.log(image.url.slice(-4))
                const fileExtension = image.url.slice(-4)
                return fileExtension === ".jpg" || fileExtension === ".png"
            
            })
            slideshow()
            slideshowInterval = setInterval(slideshow, 1000)
            formContainer.style.display = "none"
            stopBtn.style.display = "inline"
        // console.log(images)
        // .catch(console.warn)
})
}
function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}
function stop() {
    clearInterval(slideshowInterval)
    clearElement(slideshowContainer)
    stopBtn.style.display = "none"
    formContainer.style.display = "block"
    images = []
    imageIndex = -1
    value = ""
}

function slideshow() {
    imageIndex++
    if(imageIndex >= images.length) {
        imageIndex = 0
    }
    clearElement(slideshowContainer)
    const newImage = document.createElement("img")
    const newH2 = document.createElement("h2")
    const newSubP = document.createElement("p")
    const newUpsP = document.createElement("p")
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = 600
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
}


document.addEventListener("DOMContentLoaded", () => {
    formContainer = document.querySelector("#formContainer")
    searchForm = document.querySelector("#searchForm")
    searchInput = document.querySelector("#searchInput")
    stopBtn = document.querySelector("#stopBtn")
    slideshowContainer = document.querySelector("#slideshowContainer")
    searchForm.addEventListener("submit", fetchReddit)
    // console.log(formContainer, searchForm, searchInput, stopBtn, slideshowContainer)
    stopBtn.addEventListener("click", stop)
    stopBtn.style.display = "none"

})







