//variable declarations
const requestURL = "http://www.reddit.com/search.json?q="
count = 0
let carousel = []
//once content loads...
document.addEventListener("DOMContentLoaded", () => {
    //event listener for the "search" button
    form.addEventListener("submit", (e) => {
        //run fetch data function
        fetchRedditData()
        //prevent browser refresh
        e.preventDefault()
        //fetch the data + specify no NSFW items
    })
    //function to store fetched data
    const fetchRedditData = () => {
        fetch(requestURL+document.getElementById('input').value + "+nsfw:no")
        .then((responseData)=> {
            //extract JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData) => {
            //the .then passed our returned json data into this call back
            console.log("Json data:")
            //iterate through data to create new array based on if statement below
            let thumbnails = jsonData.data.children.forEach(child => {
                //if statement to avoid error messages 
                if (child.data.thumbnail !== "image" &&
                    child.data.thumbnail !== "self" &&
                    child.data.thumbnail !== "default") {
                        //create array of "cleared" imgs
                        carousel.push(child.data.thumbnail)
                    } 
            })
            //new array becomes parameter of populateImage function (see below)
            populateImage(thumbnails)
            //console.log(carousel)
            //console.log(count)
        })
        .catch((error) => {
            //if any error is sent back, you will have access to it here
            console.log ("error")
            console.log(error)
        })
        //hide header
        headerContainer.style.display = "none"
        //show stop button
        stopButton.style.display = "grid"
    }
    
    //add to carousel
    const populateImage = (search) => {
        //create a new div for each thumbnail
        const newImgDiv = document.createElement("div")
        document.querySelector(".create-carousel").appendChild(newImgDiv)
        //create a new img for each thumbnail
        const newImg = document.createElement("img")
        newImg.src = carousel[count]
        newImgDiv.appendChild(newImg)
        //create interval based on count and array length
        interval = setInterval(() => {
            count++
            if(count > carousel.length - 1){
                count = 0
            }
            newImg.src = carousel[count]
        }, 700)
    }
    //stop button
    stopButton.addEventListener("submit", (e) => {
        //browser refresh
        e.default()
    })
})