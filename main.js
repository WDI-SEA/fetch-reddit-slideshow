document.addEventListener("DOMContentLoaded", function() {

    let url = "http://www.reddit.com/search.json?q=cats+nsfw:no"
    let INTERVAL_DELAY = 2500
    let currentImages = []
    let currentIndex = 0
    let interval = null

    function errorHandler(error) {
        console.log(error);
    }

    document.getElementById("input-container").addEventListener("submit", function(e) {
        e.preventDefault();
        let inputSearch = document.getElementById('input').value
        if(inputSearch){
            getImage(inputSearch)
            document.getElementById('input').value = ''
        }
        else{
            console.log(`That's an empty string.`)
        }
    })

    function getImage() {
        fetch(url)
            .then(function(responseData) {
                return responseData.json();
            })
            .then(function(jsonData) {
                currentImages = jsonData.data.children.map(function(pic) {
                    return {
                        url: pic.data.url,
                        postHint: pic.data.post_hint
                    }
                })
                .filter(function(pic) {
                    return pic.postHint === "image"
                })
                console.log(currentImages)
                   startSlideshow()
            })
            .catch(errorHandler);
    }
    getImage();
    
    function startSlideshow() {
        currentIndex = 0
        placeImage()
        document.getElementById('input-container').style.display = 'none'
        document.getElementById('slideshow').style.visibility = 'visible'
        interval = setInterval(changeImage, INTERVAL_DELAY)
    }
    function changeImage() {
        currentIndex ++
        if(currentIndex >= currentImages.length){
            currentIndex = 0
        }
        placeImage()
    }
    function placeImage() {
        document.getElementById('slideshow').innerHTML = ''
        let img = document.createElement('img')
        img.src = currentImages[currentIndex].url
        img.alt = currentImages[currentIndex].title
        let h2 = document.createElement('h2')
        h2.textContent = currentImages[currentIndex].title + (currentImages[currentIndex].gold? '' : '')
        let h3 = document.createElement('h3')
        h3.textContent = currentImages[currentIndex].subreddit
        document.getElementById('slideshow').append(img)
        document.getElementById('slideshow').append(h2)
        document.getElementById('slideshow').append(h3)
    }
})

