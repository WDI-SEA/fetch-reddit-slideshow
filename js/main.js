let searchBtn = document.getElementById("searchBtn")
let form = document.getElementById("form")

searchBtn.addEventListener("click", displayImages)

function displayImages(e) {
    e.preventDefault()
    let searchValue = document.getElementById("searchBox").value
    queryImages(searchValue)
    form.remove()
}

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
        setInterval(cycleImages, 3000)
    })
    .catch(function(error) {
        console.log(error)
    })
}

function getJpg(link) {
    if (link.includes(".jpg")) {
        return true
    }
}

function cycleImages() {
    let displayImage = document.createElement("IMG")
    jpgOnly.forEach(function(item, index) {
        displayImage.src = jpgOnly[index]
        document.getElementById("imgBox").appendChild(displayImage)
    })
}