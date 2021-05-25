document.addEventListener("DOMContentLoaded", () => {
    // query selectors
    const requestUrl = "https://www.reddit.com/search.json?q="
    let inputForm = document.querySelector("#form")
    let bodyText = document.querySelector(".info")
    let clearButton = document.querySelector(".clear")
    let placeImage = document.querySelector(".placehere")
    let imageContainer = document.querySelector(".image-container")
    
    let newArr = []

    clearButton.style.visibility = "hidden"

    // REQUEST DATA 
    // take data from form input
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        
        let userInput = criteria.value
        // append to reddit search query in fetch
        fetch(requestUrl + userInput)
        // .then --> response data
            .then((res) => {
                return res.json()
            })
        // .then --> turn into json
            .then((jsonData) => {
                newArr = jsonData.data.children
                domSlide(newArr)
            })
        // .catch --> catch errors
            .catch((err) => {
                console.log(err)
                return err
            })

    })

        

    // RESPONSE DATA
    // collect formatted json data
    function domSlide(imgArr) {
        // hide form
        inputForm.style.visibility = "hidden"
        bodyText.style.visibility = "hidden"
        clearButton.style.visibility = "visible"

        // start image array
        let i = 0
        let interval

        // Dom manipulation
        function domMani(){
            console.log(i)
            console.log(imgArr[i].data.thumbnail)
            let imgToPlace = imgArr[i].data.thumbnail
            var elem = document.createElement("img")
            elem.setAttribute("src", imgToPlace)
            elem.setAttribute("height", "400")
            elem.setAttribute("width", "600")
            placeImage.appendChild(elem)  
            i++
            setTimeout(function(){
                placeImage.removeChild(elem)
            }, 2700)
        }

        interval = setInterval(domMani, 3000)
    }
        // create stop button
        clearButton.addEventListener("click", () => {
            inputForm.style.visibility = "visible"
            bodyText.style.visibility = "visible"
            imageContainer.style.visibility = "hidden"

            clearInterval(interval)
        })
            // should hide images 
            // display form again
})