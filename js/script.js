let form 
let stopButton
let imgEl
let images = []

const render = () => {
    imgEl = document.getElementById('image')

    form = document.getElementById('form')

    imgEl.style.display = "none"
}

const stopFetch = () => {
    console.log('stop fetch')
}

const formHandleSubmit = (event) => {
    event.preventDefault()

    console.log('form-submitted')

    const searchTerm = event.target.search.value

    console.log(searchTerm, 'search word')

    const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`

    redditFetch(url)

    let formBox = document.getElementById('form-container')

    formBox.style.display = 'none'
}

const redditFetch = (urlParam) => {

    const options = {
        headers: {
            "Accept": "application/json"
        }
    }

    fetch(urlParam, options)

    .then (response => response.json())

    .then(jsonData => {
        
        images = jasonData.data.children.map(imageChild => {
            return {
                title: imageChild.title,
                url: imageChild.data.url
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('form').addEventListener('click', 
    formHandleSubmit)

    stopButton = document.getElementById('stop-button')

})