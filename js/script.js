const submitForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const mainContainer = document.querySelector("#main-container")
const slideshowContainer = document.querySelector("#slideshow-container")
const slideshowDisplay = document.querySelector("#slideshow-display")

let searchedObjects = []
let imageObjects = []

submitForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    resetDisplay()
    fetchRedditData(searchInput.value)
})

//fetch from reddit api based on given search string
const fetchRedditData = (searchString) =>{
    // const endpoint = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`
    const endpoint = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`
    //might need raw_json=1 as an arg in the endpoint to help with image handling?
    // fetch requires the api url as arg
    // fetch(endpoint) // returns fetch object
    fetch(endpoint)
    .then(fetchObj=>fetchObj.json())
    .then(jsonData=>{
        jsonData.data.children.forEach(element=>{
            //store all objects into an array
            searchedObjects.push(element)
        })
        findImageObjects()
        displayImages()
        
    })
    .catch(err=>console.log('error fetching data',err))



}

function findImageObjects(){
    //filter out all objects that directly link to an image - array.filter()
    // imageObjects = searchedObjects.filter(element=>{
    //     element.data.url.endsWith(".jpg" || ".png" || ".gif")
    // })
    for(let i = 0; i < searchedObjects.length; i++){
        if(searchedObjects[i].data.url.includes(".jpg" || ".png")){
            imageObjects.push(searchedObjects[i])
        }
    }
}

function displayImages(){
    //iterate over all objects that had ONE single image
    
    imageObjects.forEach(image => {
        console.log(image.data.url)
        //create a new img tag
        let newImg = document.createElement('img')
        //give img new source
        newImg.src = image.data.url
        //append image to slideshowDisplay
        slideshowDisplay.appendChild(newImg)
    })
}

function containerToggler(x) {
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
}
function resetDisplay(){
    while(slideshowDisplay.firstChild){
        slideshowDisplay.removeChild(slideshowDisplay.firstChild)
    }
    searchedObjects = []
    imageObjects = []
}