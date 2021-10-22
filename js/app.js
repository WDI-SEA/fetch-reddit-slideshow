
const requestURL = "http://www.reddit.com/search.json?q="
count = 0

document.addEventListener("DOMContentLoaded", () => {
//    $('#myCarousel').carousel({
//     interval: 3000,
//     cycle: true })
   //when you use forms, use submit. This is default functionality of JS.
    form.addEventListener("submit", (e) => {
        //prevent browser refresh
        e.preventDefault()
        //fetch the data + specify no NSFW items
        fetch(requestURL+document.getElementById('input').value + "+nsfw:no" + "&raw_json=1")
        .then((responseData)=> {
            //extract JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData) => {
            //the .then passed our returned json data into this call back
            console.log("Json data:")
            //iterate through data
            jsonData.data.children.forEach(populateImage)
            console.log(count)
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
        //create a new divfor each thumbnail
        const newImgDiv = document.createElement("div")
        if (count === 0) {
            newImgDiv.className = "carousel-item active"
            } else {
                newImgDiv.className = "carousel-item"
            }
        document.querySelector(".carousel-inner").appendChild(newImgDiv)
        //create a new img for each thumbnail
        const newImg = document.createElement("img")
        newImg.src = search.data.url
        newImgDiv.appendChild(newImg)
        count++
            
       

        //create new img

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