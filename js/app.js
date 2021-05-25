document.addEventListener("DOMContentLoaded", () => {
    // store constant url for form dom element; request url
    const requestUrl = "    http://www.reddit.com/search.json?q="
    let inputForm = document.querySelector("form")
    let imageDisplay = document.querySelector("#displayImages")
    let imageResults = []
    let iterator = 0
    let intervalTimer

    // elements to hide/show
    let pageTitle = document.querySelector("#title")
    let directionsPTag = document.querySelector("#directions")
    let stopButton = document.querySelector("#stop")

    // setup event listener to stop images from being shown
    stopButton.addEventListener("click", showElements)

    // REQUEST DATA
    // take form element and prevent default behaviour
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault()

        // get user inputed value
        let userInput = input.value
        console.log(`User Input: ${userInput}`)

        // make fetch request to const api url with given user number
        fetch(requestUrl + userInput + "+nsfw:no&limit=100")
            // .then --> take response data and format
            .then(res => {
                console.log("Response came back!")
                return res.json()
            })
            // .then --> use response JSON data
            .then(jsonData => {
                imageResults = jsonData.data.children
                                .filter(element => String(element.data.url).includes(".jpg"))
                                .map(filteredData => filteredData.data.url)

                // logging results in console
                console.log(imageResults)

                // hide the form and set the first image before the interval starts
                hideElements()
                imageDisplay.src = imageResults[iterator]
                intervalTimer = setInterval(displayImage, 4000)
            })
            // .catch --> catch errors
            .catch(err => {
                console.log(err)
                return err
            })
    })

    // RESPONSE DATA
    // change image src to an img url stored in imageResults
    function displayImage() {
        // display image and reset iterator at end of array
        iterator++
        if(iterator >= imageResults.length) {
            iterator = 0
        }

        imageDisplay.src = imageResults[iterator]
    }

    function hideElements() {
        // hide title, directions, and form
        pageTitle.style.display = "none"
        directionsPTag.style.display = "none"
        inputForm.style.display = "none"

        // show stop button and image
        stopButton.style.display = "block"
        imageDisplay.style.display = "block"
    }

    function showElements() {
        // clear interval
        clearInterval(intervalTimer)

        // clear results, image, and reset iterator
        imageResults = []
        imageDisplay.src = ""
        iterator = 0

        // show title, directions, and form
        pageTitle.style.display = "block"
        directionsPTag.style.display = "block"
        inputForm.style.display = "block"

        // hide stop button and image
        stopButton.style.display = "none"
        imageDisplay.style.display = "none"
    }
})