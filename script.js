const redditEndpoint = 'https://www.reddit.com/search.json?q='
let picURLS = []

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
                let image = document.createElement('img')
                image.src = result.data.url
                return image
            })
            console.log(picURLS[0])
            // picBox.removeChild(picBox.firstChild)
            picBox.appendChild(picURLS[0])
        })
        .catch((error) => {
            console.log('Failed to fetch pics')
        })
})

