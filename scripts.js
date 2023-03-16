function fetchReddit(e) {
    e.preventDefault()
    let formInput = document.querySelector("#formInput")
    let slideshowEl = document.querySelector("slideshow")
    console.log("target =>", formInput.value)
    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
        .then(result => result.json())
        .then(results => {
            let resultImages = results.data.children.map(child => {
            //console.log(results.data.children.map) (child => {
                return {
                    url: child.data.url,
                    title: child.data.title
                }
            })

            .filter(image => {
                let imageExtention = image.url.slice(-4)
                return imageExtention === ".jpg" || imageExtention === ".png"
            })
        slideshow(resultImages)
        
        let slideshowInterval = setInterval
        (slideshow, 3000)
        // easy to invoke a function and pass images as an argument //
        })
        .catch(console.warn)
}

function slideshow(imgArr) { 
    console.log("imgs =>", imgArr)
    console.log("el =>", slideshoeEl.src)
    if(imgIndex >= imgArr.length) {
        imgIndex = 0
    }
    slideshowEl.src = imgArr[imgIndex].url
    imgIndex = imgIndex
}

let stopBtn = document.querySelector("stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
})