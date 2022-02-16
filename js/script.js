let count = 1;
let filteredImages = []

const fetchSlideshow = (searchedText) => {
    fetch(`http://www.reddit.com/search.json?q=${searchedText}+nsfw:no`)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=> {
        // console.log("Here's the data:", jsonData)
        console.log('precise data for pictures', jsonData.data.children)
        addPicturesToDom(jsonData)
    })
    .catch((error)=> {
        console.log('Error', error)
    })
}

const addPicturesToDom = (apiResults) => {
    let images = document.querySelector('#img')
    let arrayOfImages = apiResults.data.children
    filteredImages = arrayOfImages.filter((element) => {
        if(element.data.post_hint === 'image') {
            return true
        } else {
            return false
        }
    })
    
    let newImg = document.createElement('img')
    newImg.style.width = "300px"
    newImg.style.height = "300px"
    newImg.src = filteredImages[0].data.url
    images.appendChild(newImg)

    setInterval(changeImage, 1000)
}

const changeImage = () => {
   let currentImage = document.querySelector('img')
   currentImage.src = filteredImages[count].data.url
   count++
   if(count === filteredImages.length) {
       count = 0
   }
}

const stop = () => {
    document.querySelector('h1').innerText = "Reddit Slideshow"
    document.querySelector('h3').innerText = 'Type in something you would like to see a slideshow of and then click "search"'
    // document.querySelector('#searched-text').innerText = 
    document.querySelector('#search-container').innerText = 'SEARCH'
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#search").addEventListener("click", (e) => {
        e.preventDefault()
        const searchedText = document.querySelector('input').value
        document.querySelector('h1').innerText = ''
        document.querySelector('h3').innerText = ''
        document.querySelector('#searched-text').innerText = ''
        document.querySelector('#search-container').innerText = ''
        fetchSlideshow(searchedText)
    })
    document.querySelector('#stop').addEventListener('submit', stop)
})
