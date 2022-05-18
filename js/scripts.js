const userInput = document.querySelector('#user-input')
const submitForm = document.querySelector('#form')
const imageContainer = document.querySelector('#image-container')
const submitButton = document.querySelector('#submit-button')
const image = document.querySelector('img')
const clearButton = document.querySelector('#clear-button')
const section = document.querySelector('#section')
let imgUrlArr = []
let l = 0
let startSlideShow 

document.addEventListener('DOMContentLoaded', () => {
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const redditSearch = `http://www.reddit.com/search.json?q=${userInput.value}+nsfw:no&limit=150`
        fetch(redditSearch)
            .then(responseData => responseData.json())
            .then(jsonData => {
                imgUrlArr = jsonData.data.children
                imgUrlArr = imgUrlArr.filter((i)=> {
                    return i.data.post_hint === "image"
                })
                imgUrlArr= imgUrlArr.map((j)=>{
                    return j.data.url
                })
                // console.log(imgUrlArr)
            })
            section.classList.add('hidden')
            imageContainer.classList.remove('hidden')
            startSlideShow = setInterval(() => {
                image.src = imgUrlArr[l] 
                l++
                if(l >= imgUrlArr.length){
                    l = 0
                }
            }, 2000)    

    })
    clearButton.addEventListener('click', () => {
        clearInterval(startSlideShow)
        section.classList.remove('hidden')
        image.src = ""
        userInput.value = ""
        imageContainer.classList.add('hidden')
    })
})


