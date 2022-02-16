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
    let filteredImages = []

    for (let i=0; i<apiResults.data.children.length; i++) {
        let newImg = document.createElement('img')
        newImg.style.width = "300px"
        newImg.style.height = "300px" 
        // newImg.src = apiResults.data.children[i].data.url
        let arrayOfImages = apiResults.data.children[i].data.url
        filteredImages = arrayOfImages.filter((element, index, array) => {
            if(element.endsWith('.jpg')) {
                return true
            } else {
                return false
            }
        })
        console.log('filtered images', filteredImages)
        images.appendChild(newImg)
    }
}

const slideshow = () => {
    setInterval(changeImage, 1000)
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
