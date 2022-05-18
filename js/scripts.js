console.log('hello there')

const form = document.querySelector('form')
const formContainer = document.querySelector('#form-container')
const input = document.querySelector('#search')
const image = document.querySelector('#current-image')
form.addEventListener('submit', e => {
    e.preventDefault()
    formContainer.style.display = 'none'
    let newURL = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(newURL)
    .then(searchData => searchData.json())
    .then(jsonData => {
        // jsonData.data.children.forEach(post => {
        //     console.log(post.data.url)
        // })
        let picPosts = jsonData.data.children.filter(post => {
            return (post.data.url.includes('jpg') ||
                    post.data.url.includes('png'))
             
        })
        return picPosts
        
    })
    .then(posts => {
        let imgURLs = posts.map(item => {
            return item.data.url
        })
        return imgURLs
    })
    .then(slideshow)


})

function slideshow(imageArray) {
    const stopContainer = document.querySelector('#stop-button')
    const stopButton = document.createElement('button')
    stopButton.innerText = 'STOP SLIDESHOW'
    stopContainer.appendChild(stopButton)
    
    let index=0
    let slideshowInterval = setInterval(() => {
        image.src = imageArray[index]
        index++
        if (index===imageArray.length) {
            console.log('fin')
            clearInterval(slideshowInterval)
        }
        
    }, 5000)
    stopButton.addEventListener('click', () => {
        clearInterval(slideshowInterval)
        stopButton.remove()
        image.src = ''
        formContainer.style.display='block'
        input.value = ''
    })
}
