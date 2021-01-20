
// search reddit for the value entered in the text field
const searchEndpoint = "http://www.reddit.com/search.json?q="

const searchForm = document.getElementById("searchBar")
const stop = document.getElementById("stop")
const show = document.getElementById("displayImage")
const submit = document.getElementById("searchButton")
const form = document.getElementById("form")
let slideshow = []
let currentIndex = 0
let interval = null

const fetchReddit = (searchTerm) => {
    fetch(`http://www.reddit.com/search.json?q=${searchTerm}`)
    .then(response => response.json())
    .then(result => {
        console.log(result.data)
        // let photosOnly = result.data.children.filter(child => {
        //     return child.data.post_hint === 'image'
        // })
        result.data.children.forEach(child => {
            if (child.data.thumbnail !== "image" &&
                child.data.thumbnail !== "self" &&
                child.data.thumbnail !== "default") {
                    slideshow.push(child.data.thumbnail)
                }
                    
                
        })
        console.log(slideshow)
        // slideshow = photosOnly
    })
    .then(() => {
        startShow()
    })
}


const startShow = () => {
    let searchImg = document.createElement('img')
    searchImg.src = slideshow[currentIndex]
    // searchImg.alt = slideshow[currentIndex]
    show.appendChild(searchImg)
    interval = setInterval(() => {
        currentIndex++
        if(currentIndex > slideshow.length - 1){
            currentIndex = 0
        }
        searchImg.src = slideshow[currentIndex]
        searchImg.alt = slideshow[currentIndex]
    }, 500)
}

// const stopShow = () => {
//     currentIndex = 0
//     clearInterval(interval)
// }

form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchReddit()
})

stop.addEventListener('click', () => {
    clearInterval(interval)
    document.getElementById("displayImage").style.display = "none"
})
