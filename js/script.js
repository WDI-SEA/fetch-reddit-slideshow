window.addEventListener("DOMContentLoaded", () => {
    //strings for the request url
    const requestUrl = "https://www.reddit.com/search.json?q="
    const noNSFW = "+nsfw:no"

    //get all the DOM elements
    let picList = []
    let inputForm = document.querySelector("form")
    let slides = document.querySelector("#slideshow-container")
    let stop = document.querySelector("#stop")
    let search = document.querySelector("#search-container")
    let loading = document.querySelector("#loading")


    //on form submit, fetch the images and start a slideshow
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        search.style.display = "none"
        loading.style.display = "block"
        fetch(requestUrl + input.value + noNSFW)
        .then(response => {
            return response.json()
        })
        .then(jsonData => {
            //only get image posts
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
        loading.style.display = "none"
        slides.style.display = "flex"
        stop.style.display = "inline"
        //remove old slides
        while(slides.firstChild){
            slides.removeChild(slides.firstChild)
        }
        //create a new img for each slide with 0 opacity
        urlList.forEach(pic => {
            let img = document.createElement("img")
            img.src = pic
            img.classList.add("slide")
            slides.appendChild(img)
        })
        //set the first slide to active
        slides.children[0].classList.add("active")
        //iterate through the slide list, changing the active slide
        let i = 0
        const nextSlide = () => {
            slides.children[i].classList.remove("active")
            i++
            if(i === slides.children.length) i = 0
            slides.children[i].classList.add("active")
        }
        let next = setInterval(nextSlide, 5000)
        
        //on clicking stop, stop and hide the slides, display the search container
        stop.addEventListener("click", () => {
            clearInterval(next)
            stop.style.display = "none"
            slides.style.display = "none"
            search.style.display = "initial"
        })
    }
})