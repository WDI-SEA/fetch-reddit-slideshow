const redditEndpoint = 'https://www.reddit.com/search.json?q='
let picURLS = []
let i = 0
let count = null

function slideShow() {
    displayPic.src = picURLS[i]
    i++
}

function beginSlideShow() {
    count = setInterval(slideShow, 2000)
    slideShow()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function end() {
    clearInterval(count)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('form submitted')
    
    fetch(redditEndpoint + event.target.searchBox.value)
        .then((fetchedPics) => {
            return fetchedPics.json()
        })
        .then((jsonPics) => {
            picURLS = jsonPics.data.children.map((result) => {
                return result.data.url
            })
            beginSlideShow()
        })
        .catch((error) => {
            console.log('Failed to fetch pics')
        })
})

document.getElementById('pause').addEventListener('click', () => {
    end()
})
