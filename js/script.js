const thingsBeingSearched = document.getElementById('thingsSearchedAbout')
const searchBar = document.getElementById('searchBar')
const SubmitButton = document.getElementById('SubmitButton')
const title = document.getElementById('title')
const stopButton = document.getElementById('stopButton')
const instructionsH1 = document.getElementById('instructionsH1')
const instructionsH3 = document.getElementById('instructionsH3')
// const imageTag = document.createElement('img')
let imageArray = []
let counter = 0

//Request for the API
const requestUrl = "https://www.reddit.com/search.json?q="

stopButton.style.visibility = 'hidden'

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(requestUrl + searchBar.value)
        .then((responseData) => {
            // console.log('respond data', responeData)
            return responseData.json()
        })
        .then((jsonData) => {
            jsonData.data.children.forEach(imagesSearched)
            for (i = 0; i < 10; i++) {
                imageArray.push(jsonData.data.children[i].data.url)
            }
            // console.log(imageArray) 
            hideTheForm()
            
        })
        .catch((error) => {
            console.log('ERROR!')
            console.log(error)
        })
    })
    
    const settingInterval = setInterval(SlideShow, 3000)      
    
    function SlideShow () {
        if (counter < imageArray.length) {
            counter++
            imageTag.src = imageArray[counter]
        } else {
            counter = 0
        }
    }

    const imageTag = document.createElement('img')
    
    const imagesSearched = (thingSearched) => {
        imageTag.src = thingSearched.data.url
        imageTag.alt = thingSearched.data.title
        //if image doesnt show up, this is alt text of the post name of that image
        if (imageTag.src.includes("https://i.redd.it/")) {
            if (imageTag.src.includes(".jpg") 
            || imageTag.src.includes(".png")) {
                imageTag.setAttribute('src', imageTag.src)        
            } 
        // console.log(thingSearched.data.url)
        }
        document.querySelector('.thingsSearchedAbout').appendChild(imageTag)
    }

    function hideTheForm () {
        if (imageArray.length == 10) {
            searchBar.style.visibility = "hidden"
            SubmitButton.style.visibility = "hidden"
            instructionsH1.style.visibility = 'hidden'
            instructionsH3.style.visibility = 'hidden'
            stopButton.style.visibility = 'visible'
        }
    }

    function bringBackForm () {
        searchBar.style.visibility = 'visible'
        SubmitButton.style.visibility = 'visible'
        instructionsH1.style.visibility = 'visible'
        instructionsH3.style.visibility = 'visible'
    }

    function stopEverything () {
        clearInterval(settingInterval)
        bringBackForm()  
        stopButton.style.visibility = 'hidden'
        imageArray = []
        counter = 0
        imageTag.remove()
        window.location.reload()
    }
    
    stopButton.addEventListener('click', stopEverything)
})

