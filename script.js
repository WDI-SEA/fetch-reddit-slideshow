const redditEndpoint = 'https://www.reddit.com/search.json?q='
let picURLS = []

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('form submitted')
    
    fetch(redditEndpoint + event.target.searchBox.value)
        .then((fetchedPics) => {
            let x = a.b
            return fetchedPics.json()
        })
        .then((jsonPics) => {
            picURLS = jsonPics.data.children.map((result) => {
                let image = document.createElement('img')
                image.src = result.data.url
                return image
            })
            console.log(picURLS)
        })
        .catch((error) => {
            console.log('Failed to fetch pics')
        })
})

