const imageArray = [];
// Array that is filtered to only include images that are able to be loaded
let filteredArray = [];
const submit = document.getElementById("submit")
let imgToRotate = 1;
// URL to do fetch from
const requestUrl = "https://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Hides/changes styling & elements from page when Submit button clicked
        input.style.display = "none"
        submit.style.display = "none"
        p.style.display = "none"
        h1.style.display = "none"
        document.body.style.backgroundColor = "black"
        // Takes in input from input field and adds on to end of fetch URL
        fetch(requestUrl + input.value)
            .then(function (responseData) {
                return responseData.json();
            })
            .then(function (jsonData) {
                // Loops through the json data and pulls in images, pushing into array
                for (let i = 0; i < 20; i++) {
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
    // Will loop through addImages function
    const slideShow = () => {
        setInterval(addImages, 3000)
    }

    // Loops through filtered array and creates img element, resizes it, and appends to the displayImages div in the HTML
    const addImages = () => {
        console.log("this should loop")
        // let img = document.createElement("img")
        // img.src = filteredArray[imgToRotate];
        // img.style.width = "25%"
        // img.style.height = "auto"
        displayImages.style.backgroundImage = `url("${filteredArray[imgToRotate]}")`
        imgToRotate = imgToRotate + 1
        console.log(imgToRotate)
        // NOT WORKING // // // SUPPOSED to stop the interval once imgToRotate === filteredArray.length, meaning no more images left to go through
        if (imgToRotate === filteredArray.length) {
            imgToRotate = 1
        }
    }

})