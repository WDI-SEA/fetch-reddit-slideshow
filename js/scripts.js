const redditAPI = 'http://www.reddit.com/search.json?q='

const input = document.querySelector('#input')
console.log(input)
const reset = document.querySelector('#reset')
console.log(reset)
const search = document.querySelector('#searchBTN')
console.log(search)
const presearch = document.querySelector('#preSearch')
console.log(presearch)
const imageContainer = document.querySelector('#imageContainer')
console.log(imageContainer)


search.addEventListener('click', function(e){
    e.preventDefault()
    console.log(input.value)
    presearch.style.display = "none"
    fetch(redditAPI + input.value)
        .then(function(returnedData) {
            return returnedData.json()
    })
        .then(function(data){
            let imageArray = data.data.children.map(child => child.data.thumbnail)
            console.log(imageArray)
            imageArray
            let images = document.createElement('img')
            imageContainer.appendChild(images)
            let interval = 0
            let timer = setInterval(function(){
                images.src = imageArray[interval]
                interval++
            }, 2000)
            console.log(interval)
            console.log(images.src)
            images.src= imageArray[interval]
            images.style.width = "600px"
            images.style.objectFit = 'cover'
            reset.addEventListener('click', function(){
                clearInterval(timer)
                presearch.style.display = "block"
                imageContainer.removeChild(images)
            })
        })
        .catch(console.warn)
})





//have in the setInterval have something to track the an integer and it increases the index 1 and it will increase 

// src