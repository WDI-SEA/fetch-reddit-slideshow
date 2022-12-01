// js varaibles
let images = []
let imageIndex = -1
let value = ''
let slideshowInterval
// varaibles for dom elements
let formContainer, searchForm, searchInput, stopButton, slideshowContainer

// functions
function fetchReddit(e) {
    // prevent the page from refreshing
    e.preventDefault()
    // get the value that the user typed into the form
    value = searchInput.value
    console.log(value)
    // put that value in the search url and do a feath to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(anything => anything.json())
        .then(redditJson => {
            // console.log(redditJson.data.children)
            // map reddit data to our images array
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        author: child.data.author,
                        ups: child.data.ups,
                        subreddit: child.data.subreddit
                    }
                })
                // filter out non image results
                .filter(image => {
                    // console.log(image.url.slice(-4))
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension === '.png'
                })
            // console.log(images)
            // start the slideshow
            slideshow()
            slideshowInterval = setInterval(slideshow, 5000)
            // hide the form, show the stop button in its place
            formContainer.style.display = 'none'
            stopButton.style.display = 'inline'

        })
        .catch(console.warn)
}

function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function stop() {
    // clear the slideshow
    clearInterval(slideshowInterval)
    clearElement(slideshowContainer)
    // hide stop button
    stopButton.style.display = 'none'
    // show form
    formContainer.style.display = 'block'
    // reset all state (to be good programers)
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    // increment value
    imageIndex++
    // check to make sure we are not out of bounds -- if so, wrap back to 0
    if (imageIndex >= images.length) {
        imageIndex = 0
    }
    // change slideshow
    // clear out the slideshow container
    clearElement(slideshowContainer)
    // create the dom els we want
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    const newUpsP = document.createElement('p')
    // sent the props of the dom els
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '600'
    newH2.innerText = images[imageIndex].author
    newSubP.innerText = images[imageIndex].subreddit
    newUpsP.innerText = images[imageIndex].ups
    // mount the els on the slideshow container
    slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
}

// DOM contented loaded -- load up the varaibles for DOM els
document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideshowContainer = document.querySelector('#slideshowContainer')
    // mount event listeners
    searchForm.addEventListener('submit', fetchReddit)
    stopButton.addEventListener('click', stop)
    // hide stop button
    stopButton.style.display = 'none'
})

// addEventListener(eventType, callback) {
//     // do some logic based on the event type
//     // creates a new event object
//     const event = {
//         target: ...,
//     }
//     callback(event)
// }






// document.addEventListener('DOMContentLoaded', () => {
//     let form = document.querySelector('form')
//     let searchInput = document.querySelector('#searchInput')
//     let imageContainer = document.querySelector('#imageContainer')
//     let stopBtn = document.querySelector('#stopBtn')

//     form.addEventListener('submit', (e) => {
//         e.preventDefault()

//         fetch(`http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`)
//         .then(responseData => {
//             return responseData.json()
//         })
//         .then(responseData => {
//             console.log(responseData)

//             let imageArray = []
//             responseData.data.children.forEach(result => {
//                 let newImage = document.createElement('img')
//                 newImage.setAttribute('id', `${result.data.id}`)
//                 newImage.src = result.data.thumbnail
//                 newImage.alt = result.data.title
//                 if(result.data.post_hint === "image") {
//                     imageContainer.append(newImage)
//                     imageArray.push(newImage)
//                 }
//             })
//             console.log(imageArray)
//             let i = 0
//             imageArray[i].classList.add('active')

//             let imageDisplayInterval = setInterval(() => {
//                 imageArray[i].classList.remove('active')
//                 i++
//                 if(i === imageArray.length) {
//                     i = 0
//                 }
//                 imageArray[i].classList.add('active')
//             }, (5000))
//         })

//     })
// })