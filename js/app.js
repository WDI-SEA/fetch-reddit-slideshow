const textInput = document.querySelector('#text-input')
// const searchUrl = `http://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`
let returnImgArr =[]
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
            console.log(returnImgArr)
            a = 1
            returnImgArr.forEach(function(k) {
                const image = new Image()
                image.src = k
                image.alt = `${textInput} image number ${a}`
                imageContainer.append(image)
                a = a + 1
            })
            
            image
            // .catch(err => {
            //     console.warn('whoopsie daisies', err)
            // })
        })
    })
})
    