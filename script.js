document.addEventListener('DOMContentLoaded', () => {


//URL REQUEST
let requestUrl = "http://www.reddit.com/search.json?q="

//DOM VARS
let inputForm = document.querySelector("form")
let pictureBox = document.querySelector(".pictureContainer")
let playButton = document.querySelector(".playButton")
let stopButton = document.querySelector(".stopButton")
let slideShow = false
let slideCounter = 0

//global var
let images = []
let filterImages = []


//INIT
function showInit() {
    slideShow = true
}

function stopShow() {
    slideShow = false
}

//AJAX functions
function findImagesHandler (array) {
    images = array.data.children.map(src => {
        return src.data.url
        })
    filterImages = images.filter(img => {
        return img.includes(".gif") 
        || img.includes(".jpg")
    })  
}

//slideshow functions
function slideshowHandler (){
    slideShow = true
    let showPictures = document.createElement('img')
    showPictures.style.width='600px'
    showPictures.style.width='400px'
    stopButton.addEventListener('click', stopShow())
    setInterval (function (){
        slideCounter++
        if (slideCounter > filterImages.length) {
            slideCounter = 0
        }
        showPictures.src = filterImages[slideCounter]
        pictureBox.appendChild(showPictures)
        }, 2000)
    
}

//CLICK LISTENER/ PREVENT DEFAULT
inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let userInput = input.value
    
    // // Fetch REQUEST + USER DATA URL
    const fetchUserUrl = fetch(requestUrl+userInput+'&limit=100')

    //PROMISES
    async function helloReddit () {
            try {
                    const response = await fetchUserUrl
                    const jsonData = await response.json()
                    // console.log(jsonData)
                    findImagesHandler(jsonData)
                    // findImages(jsonData)
                    // images = jsonData.data.children.map(src => {
                    //     return src.data.url
                    // })
                    // console.log(images)
                    // filterImages = images.filter( content => {
                    //     return content.includes(".gif") 
                    //     || content.includes(".jpg")
                    // })
                    console.log(filterImages)
                    slideshowHandler()
                    

                }
                catch (err) {
                        console.log(err)
                        return err
                    }
                
                }
    helloReddit()
    })


})