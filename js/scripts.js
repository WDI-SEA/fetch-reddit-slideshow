const button = document.querySelector("#button")
const userInput = document.querySelector("#userInput")
const background = document.querySelector("#imageBox")
const stopButton = document.querySelector("#stopButton")
const bgImage = document.querySelector("#bg-image")
const instruction = document.querySelector("#instruction")
let runInterval;
let images = []
let count = 0

stopButton.addEventListener("click", function(){
    clearInterval(runInterval)
    userInput.value = ""
    bgImage.src = "https://static.vecteezy.com/system/resources/previews/011/916/337/original/emoji-smile-icon-symbol-on-yellow-background-smiley-face-cartoon-character-wallpaper-vector.jpg"
    button.style.visibility = 'visible'
    stopButton.style.visibility = 'visible'
    instruction.style.visibility = 'visible'
    userInput.style.visibility = 'visible'
    images = []
})

function backgroundChanging() {
    runInterval = setInterval(function(){
        if (count === images.length -1) {
            count = 0
            document.querySelector("#bg-image").src = images[count]
            count += 1
        } else {
            count += 1
            document.querySelector("#bg-image").src = images[count]
        }
    }, 5000)
}

button.addEventListener("click", function() {
    let searchInput = userInput.value
    const url = "http://www.reddit.com/search.json?q=" + searchInput + "+nsfw:no"
    fetch(url)
    .then(rawData => rawData.json())
    .then(newData => {
        for(let i = 0; i < 20; i++){
            let link = newData.data.children[i].data.url
            if (link.endsWith('.jpg')) {
            images.push(link)
            }
        }
        userInput.style.visibility = 'hidden'
        instruction.style.visibility = 'hidden'
        button.style.visibility = 'hidden'
        stopButton.style.visibilty = 'hidden'
        backgroundChanging()
        document.querySelector("#bg-image").src = images[count]
    })
    .catch(console.warn)
})



//newData.data.children[i].data.preview.images[0].source.url
