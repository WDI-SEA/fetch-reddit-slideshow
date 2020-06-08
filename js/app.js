let button1 = document.getElementById("search")
let button2 = document.getElementById("stop")
let results = document.getElementById("resultsBox")

button1.addEventListener('click', redditSearch)
// button1.addEventListener('keyup', redditSearch)
button2.addEventListener('click', reset)
// button2.addEventListener('keyup', reset)

// function displayImages() {
//     document.getElementById("images").src = "image"
// }

// let slideShowTimer = setInterval(redditSearch(), 3000)
// clearInterval(slideShowTimer, 75000)

function redditSearch() {
    var userType = document.getElementById("textbox").value

    fetch('https://www.reddit.com/search.json?q='+userType+'+nsfw:no')
        .then(function(responseData) {
            return responseData.json()
        })
        .then(function(jsonData) {
            let image = jsonData.data.children
            for (let i = 0; i < image.length; i++) {
                if (image[i].data.url.endsWith("jpg")) {
                    image.push(image[i].data.url)
                    document.getElementById("images").src = image[i]
                }
            }
            // console.log(jsonData)
        })
        .catch(function(error) {
            console.log("ERROR", error)
        })
    document.getElementById("firstScreen").innerHTML = ""
}

function reset() {
    location.reload()
}

