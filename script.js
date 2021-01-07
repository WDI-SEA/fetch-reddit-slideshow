const redditEndpoint = 'https://www.reddit.com/search.json?q='
let picURLS = []
let myImage = null
i = 0
let displayPic = document.getElementById('displayPic')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
            displayPic.src = picURLS[0]
            sleep(3000).then(() => {displayPic.src = picURLS[1]})
        })
        .catch((error) => {
            console.log('Failed to fetch pics')
        })
})

