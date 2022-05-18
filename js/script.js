const searchInput = document.querySelector("#searchInput")
const imgContainer = document.querySelector("#imgContainer")
const cancelBtn = document.querySelector("#cancelBtn")
const h1 = document.querySelector("h1")
const form = document.querySelector("form")
const img = document.querySelector("img")
let returnImgURLArr = []
let slideSpeed = 5000
let imageIndex = 0
let imgSint
let imgStimeout
let searchString = ""

document.addEventListener("DOMContentLoaded", function(){  
    cancelBtn.classList.add("hidden")
    
    form.addEventListener("submit", function(e){
        e.preventDefault()
        form.classList.add("hidden")
        h1.classList.add("hidden")
        searchString = searchInput.value
        fetchImages(searchString)
        cancelBtn.classList.remove("hidden")

    })

    cancelBtn.addEventListener("click",reset)

})

function fetchImages(searchString){
    const fetchURL = `https://www.reddit.com/search.json?q=${searchString}+nsfw:no&limit=250`
    fetch(fetchURL)
    .then(function(fetchedData){
        return fetchedData.json()
    })
    .then(function(jsonData){
        
        returnImgURLArr = jsonData.data.children
        .filter(function(i){
           return i.data.post_hint === "image";
        })
        .map(function(j){
            return j.data.url
        })
        imgStimeout = setTimeout(function(){
            img.src = returnImgURLArr[0]

            imageIndex = imageIndex + 1
        },0)

        console.log(returnImgURLArr)
        imgSint = setInterval(function(){
            if (imageIndex === returnImgURLArr.length) {
                imageIndex = 0
            }
            img.src = returnImgURLArr[imageIndex]
            imgContainer.append(img)
            imageIndex = imageIndex + 1
            
        },slideSpeed)
    })
    .catch(function(err){
        console.warn(err)
    })
}

function clearInt (){
    clearInterval(imgSint)
}

function reset(){
    clearInt()
    returnImgURLArr = []
    imageIndex = 0
    searchString = ""
    form.classList.remove("hidden")
    h1.classList.remove("hidden")
    cancelBtn.classList.add("hidden")
    img.src = ""
    searchInput.value = ""
}

