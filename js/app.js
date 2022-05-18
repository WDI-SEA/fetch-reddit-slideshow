
const options = {
    headers: {
        Accept: 'application/json'
    }
}
var imgArr = []
let k = 0
const form = document.querySelector('#form')
const input = document.querySelector('#input')
const imageContainer = document.querySelector('#image-container')
const title = document.querySelector('#title')

// fetch(url)
//     .then(responseData=> responseData.json())
//     .then(jsonData => {
//         imgArr = jsonData.data.children
//         imgArr = imgArr.filter((i) => {
//             return i.data.post_hint === "image"
//         })
//         imgArr = imgArr.map((i) => {
//             return i.data.url
//         })
//     })
const fetchImage = () => {
    const url = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(url)
            .then(responseData=> responseData.json())
            .then(jsonData => {
            imgArr = jsonData.data.children
            imgArr = imgArr.filter((i) => {
            return i.data.post_hint === "image"
        })
            imgArr = imgArr.map((i) => {
            return i.data.url
        })
            const image = new Image ()
            image.src = imgArr[k]
            image.alt = `${input.value}`
            while (imageContainer.firstChild) {
                imageContainer.removeChild(imageContainer.firstChild)
            }
            imageContainer.append(image)
    }) .catch(err => console.warn('erorr..?', err))
}
slideShow = () => {
    k++
    fetchImage()
    
}
startSlide = () => {
    setInterval(slideShow, 2000)
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault()
        
        form.style.display = 'none'
        title.classList.add('hidden')
        startSlide()
    })
    document.querySelector('#clear').addEventListener('click', (e) => {
        clearInterval(startSlide)
    })
})
