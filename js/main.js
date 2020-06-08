const API_URL = "https://www.reddit.com/search.json?nsfw=no&q="
const INTERVAL_DELAY = 5500
let currentImages = []
let currentIndex = 0
let interval = null


document.getElementById("search-form").addEventListener("submit", e =>{
    e.preventDefault()
    let userQuery = document.getElementById("query").value 

    if(userQuery){
        fetchReddit(userQuery)
        document.getElementById("query").value = ""
    } else{
        console.log("Hey , its empty")
    }
})

document.getElementById("stop-button").addEventListener("click", () => {
    
    document.getElementById("slideshow-container").style.visibility = "hidden"
    document.getElementById("form-container").style.display = "block"
    clearInterval(interval)
})

const fetchReddit = (query) => {
    fetch(API_URL + query)
    .then(response => response.json())
    .then(jsonData => {
        currentImages = jsonData.data.children.map(pic =>{
            return{
                title: pic.data.title,
                url: pic.data.url,
                subreddit: pic.data.subreddit,
                upvotes: pic.data.ups,
                gold: pic.data.gilded > 0 ? true : false,
                postHint: pic.data.post_hint
            }
        })
        .filter(pic => {
            return pic.postHint === "image"
        })
        startSlideshow()
        })
        .catch(err => {
            console.log("error", err)
    })
}

const startSlideshow = () => {
    currentIndex = 0
    placeImage()
    document.getElementById("form-container").style.display = "none"
    document.getElementById("slideshow-container").style.visibility = "visible"
    interval = setInterval(changeImage, INTERVAL_DELAY)
}

const changeImage = () => {
    currentIndex ++
    if(currentIndex >= currentImages.length){
        currentIndex = 0
    }
    placeImage()
}


const placeImage = () =>{
    document.getElementById("result").innerHTML = ""
    let img = document.createElement("img")
    img.src = currentImages[currentIndex].url 
    img.alt = currentImages[currentIndex].title
    
    let h2 = document.createElement("h2")
    h2.textContent = currentImages[currentIndex].title + (currentImages[currentIndex].gold? " CRWN" : "")
    let h3 = document.createElement("h3")
    h3.textContent = "r/" + currentImages[currentIndex].subreddit
    document.getElementById("result").append(img)
    document.getElementById("result").append(h2)
    document.getElementById("result").append(h3)
}