//variable declarations
const requestURL = "http://www.reddit.com/search.json?q="
count = 0
let slideshow = []
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        fetch(requestURL+document.getElementById('input').value)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {
            console.log("Json data:")
            let images = jsonData.data.children.forEach(child => {
                if (child.data.image !== "image" &&
                    child.data.image !== "self" &&
                    child.data.image !== "default") {
                        slideshow.push(child.data.thumbnail)
                    } 
            })

            populateImage(images)
                console.log(slideshow)
        })
        .catch((error) => {
            console.log ("error")
            console.log(error)
        })

        headerContainer.style.display = "none"
        stopButton.style.display = "grid"
    })

    const populateImage = (search) => {
        const newImgDiv = document.createElement("div")
        document.querySelector(".create-slideshow").appendChild(newImgDiv)
        const newImg = document.createElement("img")
        newImg.src = slideshow[count]
        newImgDiv.appendChild(newImg)
        interval = setInterval(() => {
            count++
            if(count > slideshow.length - 1){
                count = 0
            }
            newImg.src = slideshow[count]
        }, 500)
    }

    stopButton.addEventListener("submit", (e) => {
        e.default()
    })
}) 