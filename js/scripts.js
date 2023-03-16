console.log("Hello world")

const imageElement = document.querySelector("#imageElement")
const searchbutton = document.querySelector("#searchButton")
const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#searchInput")
const nextButton = document.querySelector("#nextButton")
const stopButton = document.querySelector("#stopButton")

const redditURL = "http://www.reddit.com/search.json?q="
const endRedditURL = "+nsfw:no&limit=100"
let arrayMap = []
let currentImage = 0
let filteredArray = []
let searchTerms = ""
let searchTermsString = ""
let transitionInInterval = 

// console.log(`${redditURL}${searchTerms}${endRedditURL}`)
console.dir(imageElement)

searchForm.addEventListener("submit", function(e) {
    e.preventDefault()
    searchTerms = searchInput.value.split(" ")
    console.dir(stopButton)
    searchForm.style.display = "none"
    stopButton.style.display = "block"
    let nextImage = function() {
        currentImage ++
            if (currentImage >= filteredArray.length) {
                currentImage = 0
            }
            imageElement.src = filteredArray[currentImage]
        }
    let nextImageInterval = setInterval(nextImage, 3000)

    fetch(`${redditURL}${searchTerms}${endRedditURL}`, {
        "limit": 100,
    })
    .then(taco => taco.json())
    .then(function (jsonData) {
        const childrenArray = jsonData.data.children
        console.dir(childrenArray)
        arrayMap = childrenArray.map(function (children){
            return children.data.url
        })

        console.log(arrayMap)
        filteredArray = arrayMap.filter(function (url){
            return url.slice(-3) === "jpg"
        })
        imageElement.src = filteredArray[0]
        
    })
    nextImageInterval
    //   .catch(console.warn)
    // nextButton.addEventListener("click", function(){
    //     nextImage
    //     // if (currentImage >= filteredArray.length) {
    //     //     currentImage = 0
    //     // }
    //     // imageElement.src = filteredArray[currentImage]
    //     console.log("next button")
    // })
    stopButton.addEventListener("click", function () {
        clearInterval(nextImageInterval)
        arrayMap = []
        currentImage = 0
        filteredArray = []
        searchterms = ""
        searchTermsString = ""
        searchForm.style.display = "block"
        imageElement.src = ""
    })
})
    
    

