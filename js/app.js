const textInput = document.querySelector('#text-input')
// const searchUrl = `http://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`
const image = document.querySelector('img')

let returnImgArr =[]
let slideSpeed = 4000
let imageIndex = 0
let imageSetInt
let imageSetTO


const options = {
        headers: {
            'Accept': 'application/json'
        }
}

document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('#image-container')
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault()
        const textInput = document.querySelector('#text-input')
        console.log(textInput.value)
        const searchUrl = `http://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`
        fetch(searchUrl, options) 
        .then(responseData => responseData.json())
        .then(jsonData => {
            let returnImgArr = jsonData.data.children
            .filter(function(i) {
                return i.data.post_hint === 'image'
            })
            .map(function(j) {
                return j.data.url
            })
            
            imageSetTO = setTimeout(function(){
                image.src = returnImgArr[0]
                imageIndex = imageIndex + 1
            }, 0)
            
            
            console.log(returnImgArr)
            imageSetInt = setInterval(function() {
                if (imageIndex === returnImgArr.length) {
                    imageIndex = 0
                }
                image.src = returnImgArr[imageIndex]
                imageContainer.append(image)
                imageIndex = imageIndex + 1
            }, slideSpeed)
            
        })
        .catch(err => {
            console.warn('whoopsie daisies', err)
        })
    })
})
    