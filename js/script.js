window.addEventListener("DOMContentLoaded", () => {
    const requestUrl = "https://www.reddit.com/search.json?q="
    const noNSFW = "+nsfw:no"
    let picList = []
    let inputForm = document.querySelector("form")
    let slides = document.querySelector("#slideshow-container")

    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        document.querySelector("#search-container").style.display = "none"
        fetch(requestUrl + input.value + noNSFW)
        .then(response => {
            return response.json()
        })
        .then(jsonData => {
            let imgPosts = jsonData.data.children.filter(post => post.data.post_hint === "image")
            picList = imgPosts.map(pic => pic.data.url)
            slideshow(picList)
        })
        .catch(error => {
            console.log(error)
            return error
        })
    })
    
    function slideshow(urlList) {
        console.log(`Starting slideshow with ${urlList.length} slides`)
        urlList.forEach(pic => {
            let img = document.createElement("img")
            img.src = pic
            img.classList.add("slide")
            slides.appendChild(img)
        })
        console.log(slides.children[0])
        slides.children[0].classList.add("active")
        let i = 0
        const nextSlide = () => {
            slides.children[i].classList.remove("active")
            i++
            if(i === urlList.length) i = 0
            slides.children[i].classList.add("active")
        }
        let next = setInterval(nextSlide, 5000)
        
        let stop = document.createElement("button")
        stop.textContent = "stop slides"
        document.querySelector("body").appendChild(stop)
        stop.addEventListener("click", () => {
            clearInterval(next)
        })
    }
})