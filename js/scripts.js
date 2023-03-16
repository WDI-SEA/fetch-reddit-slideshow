const startButton = document.querySelector("#startButton")
const stopButton = document.querySelector("#stopButton")
const searchForm = document.querySelector("#searchForm")
const userInput = document.querySelector("#userInput")

let slides = []
let count = 0
let runInterval
// console.log(runInterval)

// console.log(startButton, stopButton, searchForm, userInput)

// submit the form and fetch the reddit data
searchForm.addEventListener("submit", e => {
    e.preventDefault()
    let keyword = userInput.value
    let redditUrl = `http://www.reddit.com/search.json?q=${keyword}+nsfw:no`
    console.log(keyword, redditUrl)
    if (userInput.value !== "") {
        fetch(redditUrl)
            .then(rawData => rawData.json())
            .then((jsonData) => {
                console.log(jsonData)
                let filteredData = jsonData.data.children.filter(function(child) {
                    return child.data.url.endsWith(".jpg") || child.data.url.endsWith(".png")
                })
                slides = filteredData.map(function(child) {
                    return child.data.url
                })
                console.log(slides)
                runSlideshow()
            })
            .catch(console.warn)
        }
    })


const imageDiv = document.querySelector(".imageDiv")
const titleCard = document.querySelector(".titleCard")

// get the slideshow going w/ intervals
function runSlideshow() {
    count = 0
    let img = document.createElement("img")
    img.src = slides[count]
    imageDiv.appendChild(img)
    runInterval = setInterval(function() {
        count++
        if (count >= slides.length) {
            count = 0
        }
        img.src = slides[count]
    }, 2000)
    titleCard.style.visibility = "hidden"
    imageDiv.style.visibility = "visible"
    stopButton.style.visibility = "visible"
}

// stop the slideshow and go back to how things were without refreshing the page
stopButton.addEventListener("click", function() {
    clearInterval(runInterval)
    imageDiv.innerHTML = ""
    slides = []
    userInput.value = ""
    imageDiv.style.visibility = "hidden"
    titleCard.style.visibility = "visible"
    stopButton.style.visibility = "hidden"
})