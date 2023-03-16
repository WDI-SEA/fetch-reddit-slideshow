let pleaseStop = false;

const searchInput = document.querySelector("#searchInput")
console.log(searchInput)

let stopButton = document.querySelector("#stop");
stopButton.addEventListener("click", () => {
    pleaseStop = true;

})

const redditSearch = document.querySelector("#redditSearch")
console.log(redditSearch)
redditSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(searchInput.value)
    // url = url + searchInput.value + "+ nsfw:no"
    const url = `http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`
    const slideshow = document.querySelector("#slideshow")
    
    fetch(url)
        .then(function(rawResponseData) {
            return rawResponseData.json()
        })
        .then(function(jsonData) {
            // console.log(jsonData.data.children[0].data.url)
    let i = 0;
    let intervalId = setInterval(function () {
        if (pleaseStop) {
            clearInterval(intervalId)
        }
        else if (i < jsonData.data.children.length) {
                slideshow.innerHTML = `<img src="${jsonData.data.children[i].data.url}">`
                i++} else {
                    clearInterval(intervalId)
                }
            }, 3000)
            
    
        })
        
})
