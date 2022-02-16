let imageDiv = document.getElementById('imageDisplay')
const searchBar = document.getElementById("searchBar")
const searchBtn = document.getElementById("searchBtn")
const stopBtn = document.getElementById("stopBtn")
const h1 = document.querySelector("h1")
const imageP = document.querySelector("p")
let imageResults = document.getElementById("imageResults")
let searchInput
let timeInterval 

searchBtn.addEventListener("click", (event)=> {
    event.preventDefault()
    searchInput = searchBar.value
    searchBtn.style.display = "none"
    h1.style.display = "none"
    stopBtn.style.display = "inline-block"
    searchBar.style.display = "none"
    imageP.style.display = "block"
    imageResults.textContent = `${searchInput}`
    fetchQuery(searchInput)
})
const fetchQuery = (inp) => {
    // e.preventDefault()
    const endPoint = `http://www.reddit.com/search.json?q=${searchInput}+nsfw:no`

    fetch(endPoint)
    .then(res => res.json())
    .then(jsonData => {
        let arr = jsonData.data.children
        let newArr = arr.map((child) => {
            return child.data.url
        })

        console.log(newArr)

        let imageArray = newArr.filter((image) => {
            let jpgChecker = image.slice(image.length -4)
            // console.log(jpgChecker)
            if(jpgChecker === ".jpg") {
                return image
            }
        })
        // console.log(imageArray)
        getImageSlideShow(imageArray)
    })
}

const getImageSlideShow = (images) => {
    let x = 0
    let img = document.createElement("img")
    imageDiv.appendChild(img)

    // for( let x = 0; x < images.length; x++){

  
    timeInterval = setInterval(() => {
         img.src = images[x]
        if(x < images.length -1){
            x++
        } else {
            x = 0
        }
     }, 2000)
 }

 const clearResults = () => {
     while(imageDiv.firstChild){
         imageDiv.removeChild(imageDiv.firstChild)
     }
     clearInterval(timeInterval)
     searchBtn.style.display = "inline-block"
     h1.style.display = "inline-block"
     stopBtn.style.display = "none"
     searchBar.style.display = "inline-block"
     searchBar.value = ""
    imageP.style.display = "none"
 }

 stopBtn.addEventListener("click", (event) => {
     event.preventDefault()
     clearResults()
    //  clearInterval(timeInterval)
    //  searchBtn.style.display = "inline-block"
    //  h1.style.display = "inline-block"
    //  stopBtn.style.display = "none"
    })

