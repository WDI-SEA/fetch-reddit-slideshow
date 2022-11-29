// // js varaibles
// let images = []
// let imageIndex = -1
// let value = ''
// let slideshowInterval
// // varaibles for dom elements
// let formContainer, searchForm, searchInput, stopButton, slideshowContainer

// // functions
// function fetchReddit(e) {
//     // prevent the page from refreshing
//     e.preventDefault()
//     // get the value that the user typed into the form
//     value = searchInput.value
//     console.log(value)
//     // return the function early if there is no input
//     if (value === '') {
//         searchInput.placeholder = 'type something in 🎹!'
//         return
//     }
//     // put that value in the search url and do a feath to reddit
//     fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
//         .then(anything => anything.json())
//         .then(redditJson => {
//             // console.log(redditJson.data.children)
//             // map reddit data to our images array
//             images = redditJson.data.children.map(child => {
//                     return {
//                         url: child.data.url,
//                         author: child.data.author,
//                         ups: child.data.ups,
//                         subreddit: child.data.subreddit
//                     }
//                 })
//                 // filter out non image results
//                 .filter(image => {
//                     // console.log(image.url.slice(-4))
//                     const fileExtension = image.url.slice(-4)
//                     return fileExtension === '.jpg' || fileExtension === '.png'
//                 })
//             // console.log(images)
//             // start the slideshow
//             slideshow()
//             slideshowInterval = setInterval(slideshow, 1000)
//             // hide the form, show the stop button in its place
//             formContainer.style.display = 'none'
//             stopButton.style.display = 'inline'

//         })
//         .catch(console.warn)
// }

// function clearElement(el) {
//     while (el.firstChild) {
//         el.removeChild(el.firstChild)
//     }
// }

// function stop() {
//     // clear the slideshow
//     clearInterval(slideshowInterval)
//     clearElement(slideshowContainer)
//     // hide stop button
//     stopButton.style.display = 'none'
//     // show form
//     formContainer.style.display = 'block'
//     // reset all state (to be good programers)
//     images = []
//     imageIndex = -1
//     value = ''
// }

// function slideshow() {
//     // increment value
//     imageIndex++
//     // check to make sure we are not out of bounds -- if so, wrap back to 0
//     if (imageIndex >= images.length) {
//         imageIndex = 0
//     }
//     // change slideshow
//     // clear out the slideshow container
//     clearElement(slideshowContainer)
//     // create the dom els we want
//     const newImage = document.createElement('img')
//     const newH2 = document.createElement('h2')
//     const newSubP = document.createElement('p')
//     const newUpsP = document.createElement('p')
//     // sent the props of the dom els
//     newImage.src = images[imageIndex].url
//     newImage.alt = value
//     newImage.width = '600'
//     newH2.innerText = images[imageIndex].author
//     newSubP.innerText = images[imageIndex].subreddit
//     newUpsP.innerText = images[imageIndex].ups
//     // mount the els on the slideshow container
//     slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
// }

// // DOM contented loaded -- load up the varaibles for DOM els
// document.addEventListener('DOMContentLoaded', () => {
//     formContainer = document.querySelector('#formContainer')
//     searchForm = document.querySelector('#searchForm')
//     searchInput = document.querySelector('#searchInput')
//     stopButton = document.querySelector('#stopButton')
//     slideshowContainer = document.querySelector('#slideshowContainer')
//     // mount event listeners
//     searchForm.addEventListener('submit', fetchReddit)
//     stopButton.addEventListener('click', stop)
//     // hide stop button
//     stopButton.style.display = 'none'
// })



console.log('scriptt work')

//js variables
let images = []
let imageIndex = -1
let value = ''
let slideshowInterval
// variables for DOM elements
let formContainer, searchForm, searchInput, stopButton, slideShowContainer


function fetchReddit(e) {
    //prevent page from refreshing
    e.preventDefault()
    //get the value that the user typed into the form
    value = searchInput.value
    console.log(value)
    //return function early if there is no input
    if (value === '') {
        searchInput.placeholder = 'type something in to search!'
        return
    }
    //put the value in the search url and do a fetch to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(responseData => responseData.json())
        .then(redditJson => {
            // console.log(redditJson.data.children)
            //map reddit data to our images array
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        author: child.data.author,
                        ups: child.data.ups,
                        subreddit: child.data.subreddit
                    }
                })
                //filter out non images
                .filter(image => {
                    // console.log(image.url.slice(-4))
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension === '.png'
                })
                // console.log(images)
                //start the slideshow
                slideshow()
                slideshowInterval = setInterval(slideshow, 5000)
                //hide the form, show stop button
                formContainer.style.display = 'none'
                stopButton.style.display = 'inline'
            })
        .catch(console.warn)
}

function clearElement(el) {
    while(el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

// instead of refreshing, this is manual restart
function stop() {
    //clear the slideshow
    clearInterval(slideshowInterval)
    clearElement(slideShowContainer)
    //hide stop button
    stopButton.style.display = 'none'
    //show form
    formContainer.style.display = 'block'
    //reset all state (to be good programers)
    images = []
    imageIndex = -1
    value = ''
}

function slideshow() {
    //increment value
    imageIndex++
    //check to make sure we are now out of bounds -- if so, wrap back to 0
    if (imageIndex >= images.length) {
        imageIndex = 0
    }
    //change slideshow
    //clear out the slideshow container
    clearElement(slideShowContainer)
    //create the dom els we want
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    const newUpsP = document.createElement('p')
    //sent the props of the dom else
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newImage.width = '600'
    newH2.innerText = image[imageIndex].author
    newSubP.innerText = image[imageIndex].subreddit
    newUpsP.innerText = image[imageIndex].ups
    //mount the else on the slideshow container
    slideshowContainer.append(newImage,newHw, newSubP, newSubP)
}

document.addEventListener('DOMContentLoaded', () => {
    slideshowContainer = document.querySelector('#slideshowContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector("#stopButton")
    slideShowContainer = document.querySelector("#slideshowContainer")
    //mount Eventlisteners
    searchForm.addEventListener('submit', fetchReddit)
    stopButton.addEventListener('click', stop)
    //hide stop button
    stopButton.style.display = 'none'
})