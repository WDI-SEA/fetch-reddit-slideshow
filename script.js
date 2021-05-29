document.addEventListener("DOMContentLoaded", () => {
    // APP STATE
const TIMER_SPEED = 1000
    // variable for our interval
let slideshowInterval = null
    // container for the images
let images = []
    // index of the current image being shown
let imageIndex = 0

    // DOM SELECTORS

const SEARCH_FORM = document.querySelector('#search-form')
const SEARCH_INPUT = document.querySelector('#search-input')
const SUBMIT_BUTTON = document.querySelector('#submit-button')
const STOP_BUTTON = document.querySelector('#stop-button')
const SLIDESHOW_CONTAINER = document.querySelector('#slideshow-container')

SEARCH_FORM.addEventListener('submit', fetchReddit)
STOP_BUTTON.addEventListener('click', stopSlideshow)
STOP_BUTTON.style.display= 'none'

    // FUNCTIONS

    function fetchReddit(e) {
        e.preventDefault()
        // console.log(SEARCH_INPUT.value)
        // fetch form reddit
        fetch('http://www.reddit.com/search.json?q=' + SEARCH_INPUT.value)
        .then ((res) => {
            return res.json()
        })
        .then((jsonData) => {
            console.log(jsonData.data.children)
            images = jsonData.data.children.map(child => {
                return{
                    url: child.data.url,
                    subreddit: child.data.subreddit,
                    author: child.data.subreddit
                }
            })
            .filter(image => {
                const fileExtension = image.url.slice(-4)
                if(fileExtension === '.jpg' || fileExtension === '.png') return true
                return false
            })
            // set the interval for the slideshow
            slideshowInterval = setInterval(changeSlide, TIMER_SPEED)
            STOP_BUTTON.style.display = 'inline'
            //invoke the slideshow callback one time
            changeSlide()
        })
        .catch(err => console.log(err))

        //we use catch bc we are good programmers
    }
// // callback function for the interval
// function changeSlide() {
//     // increment the slideshow index
//     imageIndex++
//     // reset the image index if it is out of bounds
//     if(imageIndex >= images.length) imageIndex = 0
//     console.log(images[imageIndex])
//     // first empty out the div of any elements
//     while(SLIDESHOW_CONTAINER.firstChild) {
//         SLIDESHOW_CONTAINER.removeChild(SLIDESHOW_CONTAINER.firstChild)
//     }
//     //update the DOM
//     const imageSlide = document.createElement('img')
//     imageSlide.src = images[imageIndex].url
//     imageSlide.alt = images[imageIndex].author
//     imageSlide.width = '400'

//     SLIDESHOW_CONTAINER.appendChild(imageSlide)
// }


//     function stopSlideshow() {
//         // stop the madness
//     }






















    // // set variables
    // const requestUrl = 'http://www.reddit.com/search.json?q='
    // let inputForm = document.querySelector('form')
    // let catPics = document.querySelector('#catPics')
    // let catRes = []

    // //REQUEST DATA 
    // //take form element and prevent default behavior
    // inputForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //  // get user inputted animal
    //     let userInput = input.value

    // //make fetch request to const api url with given user input   
    // fetch(requestUrl + userInput)
    //     .then((response) => {
    //         let jsonData = response.json()
    //         console.log("it works!")
    //         return jsonData
    // })
    //     .then ((jsonData) => {
    //         catRes = jsonData.data.children
    //         // domCatRes(catRes)
    //         console.log(catRes)
    //         for (let i =0; i <catRes.length; i++) {
    //             (catRes.results[i].data.url)                
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // })

})
  





