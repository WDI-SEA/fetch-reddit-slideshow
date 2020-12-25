const SlideDelay = 3000;
const API_Url = "https://www.reddit.com/search.json?q="

let fetchedImage = [];
let currentIndex = 0;
let interval;

const clickSearchBtn = e => {
    e.preventDefault();

    let searchWord = document.getElementById("searchBox").value;

    fetch(API_Url + searchWord + "+nsfw:no")
    .then(function(responseData) {
        return responseData.json()
    })
    .then(result => {
        let rawData = result.data.children

        currentImages = rawData.map(post => {
            return {
                url: post.data.url
            }
        })
    .filter(jpgS => {
        return jpgS.url.includes(".jpg") || jpgS.url.includes(".png")
    })
    currentIndex = 0;
    
    placeImage()
    clearInterval(interval)
    interval = setInterval(slideShow, SlideDelay)
    })
    

    .catch(function(error) {
        console.log(error)
    })
}

const placeImage = () => {
    let imageBox = document.querySelector(".imagebox");
    imageBox.innerHTML = "";
    let newJPG = document.createElement("img");
    newJPG.src = currentImages[currentIndex].url;
    newJPG.style.maxWidth = "500px";
    newJPG.style.height = "auto";
    newJPG.style.alignSelf = "center";
    newJPG.style.marginTop = "40px"

    imageBox.append(newJPG);
}

const slideShow = () => {
    currentIndex++
        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }
    placeImage()
}

const slideStop = () => {
    clearInterval(interval);
    let imageBox = document.querySelector(".imagebox");
    imageBox.innerHTML = "";
    
}

document.querySelector("#searchButton").addEventListener("click", clickSearchBtn);
document.querySelector("#stopButton").addEventListener("click", slideStop)

