const userInput = document.querySelector('#user-input')
const submitForm = document.querySelector('#form')
const imageContainer = document.querySelector('#image-container')
const submitButton = document.querySelector('#submit-button')
const image = document.querySelector('img')
const clearButton = document.querySelector('#clear-button')
const section = document.querySelector('#section')
let imgUrlArray = []
let l = 0
let startSlideShow 

document.addEventListener('DOMContentLoaded', () => {
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // url with user input search term/phrase
        const redditSearch = `http://www.reddit.com/search.json?q=${userInput.value}+nsfw:no&limit=150`
        fetch(redditSearch)
            //turn it to json
            .then(responseData => responseData.json())
            .then(jsonData => {
                //get the inside info
                imgUrlArray = jsonData.data.children
                //only pull photos
                imgUrlArray = imgUrlArray.filter((i)=> {
                    return i.data.post_hint === "image"
                })
                //create new array
                imgUrlArray= imgUrlArray.map((j)=>{
                    //pop. array w/url of images
                    return j.data.url
                })
                // console.log(imgUrlArr)
            })
            //hide the form/title/instructions
            section.classList.add('hidden')
            //reveal image container
            imageContainer.classList.remove('hidden')
            //set interval for every 2 seconds
            slideShow = setInterval(() => {
                //change source of img to diff index of image url array
                image.src = imgUrlArray[l] 
                //increase index number on every itteration
                l++
                //once reach the end of the array start back at the beginning
                if(l >= imgUrlArray.length){
                    l = 0
                }
            }, 2000)    

    })
    clearButton.addEventListener('click', () => {
        //clear the slidshow interval
        clearInterval(slideShow)
        //show title/form/instructions again
        section.classList.remove('hidden')
        //reset image source to nothing
        image.src = ""
        //empties form for user to search something new
        userInput.value = ""
        //hide image container
        imageContainer.classList.add('hidden')
    })
})


