/*----- DOM REFS -----*/
let searchBtn = document.getElementById("searchBtn")
let form = document.getElementById("form")
let imgBox = document.getElementById("imgBox")
let heading = document.getElementById("heading")
let intro = document.getElementById("intro")
let displayImage = document.createElement("img")
let stopBtn = document.getElementById("stopBtn")

/*----- Set index variable and interval. -----*/
let idx = 0
let reset = null;

/*----- Event Listeners -----*/
searchBtn.addEventListener("click", displayImages)
stopBtn.addEventListener("click", stopImages)

/*----- Search Action Function -----*/
function displayImages(e) {
    e.preventDefault()
    let searchValue = document.getElementById("searchBox").value
    init()
    queryImages(searchValue)
}
/*----- Function to query with inputted search value, return appropriate image array and set an interval to display each image. -----*/
function queryImages(searchTerm) {
    fetch(`https://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`)
    .then(function(resData) {
        return resData.json()
    })
    .then(function(jsonData) {
        let results = jsonData.data.children
        imgArr = results.map(function(listing) {
            return listing.data.url
        })
        jpgOnly = imgArr.filter(getJpg)
        displayImage.style.width = "400px";
        displayImage.src = jpgOnly[0]
        idx++
        reset = setInterval(srcSwap, 2000)
    })
    .catch(function(error) {
        console.log(error)
    })
}

/*----- Function to filter out only the .jpg content files -----*/
function getJpg(link) {
    if (link.includes(".jpg")) {
        return true
    }
}

/*----- Function to run at an interval to swap out the .src attribute of the image carousel. -----*/
function srcSwap() {
    if (idx < jpgOnly.length) {
        displayImage.style.width = "400px";
        displayImage.src = jpgOnly[idx]
        idx++
    } else {
        idx = 0
    }  
}

/*----- Function launched on search entry to remove and add appropriate page elements -----*/
function init() {
    form.style.display = "none"
    heading.style.display = "none"
    intro.style.display = "none"
    stopBtn.style.display = "inline-block"
    imgBox.appendChild(displayImage)
}

/*----- stopBtn click function to revert back to initial page and stop the interval -----*/
function stopImages() {
    stopBtn.style.display = "none"
    form.style.display = "block"
    heading.style.display = "block"
    intro.style.display = "block"
    let searchValue = document.getElementById("searchBox")
    searchValue.value = ""
    displayImage.remove()
    clearInterval(reset)
}