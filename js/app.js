const requestURL = "http://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
   //when you use forms, use submit. This is default functionality of JS.
    form.addEventListener("submit", (e) => {
        //prevent browser refresh
        e.preventDefault()
        //fetch the data + specify no NSFW items
        fetch(requestURL+document.getElementById('input').value + "+nsfw:no")
        .then((responseData)=> {
            //extract JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData) => {
            //the .then passed our returned json data into this call back
            console.log("Json data:")
            //iterate through data
            jsonData.data.children.forEach(populateImage)
        })
        .catch((error) => {
            //if any error is sent back, you will have access to it here
            console.log ("error")
            console.log(error)
        })
        headerContainer.style.display = "none"
        stopButton.style.display = "inline-block"
    })

    //add image
    const populateImage = (search) => {
        //create a new image for each thumbnail
        const newImg = document.createElement("img")
        newImg.id = "newPic"
        newImg.src = search.data.thumbnail
        document.querySelector("#picture").appendChild(newImg)
        // const newImg = document.querySelector("#dogPic")
        // newImg.src = search.data.thumbnail
    }

    //stop button
    stopButton.addEventListener("submit", (e) => {
        //browser refresh
        e.default()
        //headerContainer.style.display = "grid"
        //stopButton.style.display = "none"
        //picture.style.display = "none"
        //input.value = null
    })

})

