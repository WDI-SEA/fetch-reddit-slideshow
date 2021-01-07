document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM Content Loaded')
})

const redditEndpoint = 'https://www.reddit.com/search.json?q='

form.addEventListener('submit', (e) => {

    e.preventDefault()

    console.log('form submitted')

    fetch(redditEndpoint + e.target.searchBox.value)
    .then((fetchedPics) => {
        return fetchedPics.json()
    })
    .then((jsonPics) => {
        console.log(jsonPics.data.children[0].data.preview.images[0].source.url)
    })
    .catch((error)=>{
        console.log('Failed to fetch pics')
    })
})