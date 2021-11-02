let imageArray = [];
// Array that is filtered to only include images that are able to be loaded
let filteredArray = [];
const submit = document.getElementById("submit")
let searchOn = true;
// Counter that ++ in addImage function below that is used as index for filteredArray
let imgToRotate = 1;
let interval;
// URL to do fetch from
const requestUrl = "https://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stop").style.display = "none"
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(requestUrl + input.value)
            .then(function (responseData) {
                return responseData.json();
            })
            .then(function (jsonData) {
                // Loops through the json data and pulls in images, pushing into array
                for (let i = 0; i < 25; i++) {
                    imageArray.push(jsonData.data.children[i].data.url)
                }
                // Filters array to only include images that are able to be displayed
                // Checks to make sure they're not gifs
                const ext = ".jpg"
                filteredArray = imageArray.filter(function (link) {
                    return link.indexOf(ext) !== -1 && link.includes("redd.it")
                })
                // Call for slideshow function to start
                slideShow()
            })
            .catch((error) => {
                console.log("ERROR!!!")
                console.log(error)
            })
    })
    // Will loop through addImages function and removes elements from page
    let slideShow = () => {
        document.getElementById("stop").style.display = "block"
        searchOn = true
        input.style.display = "none"
        submit.style.display = "none"
        p.style.display = "none"
        h1.style.display = "none"
        document.body.style.backgroundColor = "black"
        interval = setInterval(addImages, 2000)
    }
    // Loops through filtered array and creates img element, resizes it, and appends to the displayImages div in the HTML
    const addImages = () => {
        if (searchOn === true) {
            displayImages.style.backgroundImage = `url("${filteredArray[imgToRotate]}")`
            imgToRotate = imgToRotate + 1
            if (imgToRotate === filteredArray.length) {
                imgToRotate = 1
            }
        }
    }
    // Stop button functionality
    document.getElementById("stop").addEventListener("click", () => {
        // Shows elements/styles that were hidden when slideshow starts
        document.getElementById("stop").style.display = "none"
        input.style.display = "inline"
        submit.style.display = "inline"
        p.style.display = "block"
        h1.style.display = "block"
        document.body.style.backgroundColor = "white"
        displayImages.style.background = "white"
        input.value = ''
        imageArray = []
        filteredArray = []
        searchOn = false
        displayImages.style.backgroundSize = "contain"
        displayImages.style.backgroundRepeat = "no-repeat"
        displayImages.style.backgroundPosition = "center center"
        clearInterval(interval)
    })
})

//const changeSlide = setInterval(addImages, 3000)
