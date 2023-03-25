
let formInput = document.querySelector("#formInput")
let slideshowEl = document.querySelector("#slideshow")
let resultImages
let slideshowInterval

function fetchReddit(e) {
    e.preventDefault()
   
    console.log("input =>",formInput.value)
    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
        .then(result => result.json())
        .then(results => {
            
            resultImages = results.data.children.map(child => {
                return {
                    url: child.data.url,
                    title: child.data.title
                }
            })
           
            .filter(image => {
                let imgExtension = image.url.slice(-4)
                return imgExtension === ".jpg" || imgExtension === ".png"
            })
            console.log("inside fetch", resultImages)
           
            let slideshowInterval = setInterval(slideshow, 1000)
            slideshowInterval = setInterval(() => {
                slideshow(resultImages)
            }, 3000)

        })
        .catch(console.warn)
function slideshow(resultImages) {
let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
    clearInterval(slideshowInterval)
})
let submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener("click", fetchReddit)