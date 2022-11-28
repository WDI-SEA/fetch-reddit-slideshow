// set base search url
const url = 'http://www.reddit.com/search.json?q='

// declare query selectors: Search terms input, start button, stop button, <p> to place images in, title, instruction text
const query = document.querySelector('#query')
const start = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const images = document.querySelector('#images')
const title = document.querySelector('#title')
const instructions = document.querySelector('#instructions')
// set initial image number
let i = 0

// prevent ability to submit text form by pressing the enter key
query.addEventListener(
  'keydown',
  function (e) {
    if (
      e.keyIdentifier === 'U+000A' ||
      e.keyIdentifier === 'Enter' ||
      e.keyCode === 13
    ) {
      if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
        e.preventDefault()
        return false
      }
    }
  },
  true
)

// declare slideshowChange in global scope so that it can be accessed/stopped later in the stop event listener
let slideshowChange

// add click event queryto start button which initiates search using the values in the text input
start.addEventListener('click', () => {
  // fetch query url plus an addition to keep it safe for work
  fetch(url + query.value + '+nsfw:no')
    .then((response) => response.json())
    .then((responseData) => {
      // hide all of the query set elements and un-hide the slideshow elements
      start.style.display = 'none'
      query.style.display = 'none'
      title.style.display = 'none'
      instructions.style.display = 'none'
      images.style.display = 'block'
      stopButton.style.display = 'block'
      // change the innerHTML of a pre-built <p> designed to house the images, placed once outside of the setInterval so that the slideshow starts immediately instead of 5000ms after the button is clicked
      images.innerHTML = `<img src="${responseData.data.children[i].data.url}" />`
      // increment variable that holds the current item number for the order of the slideshow
      i++
      // every 5000ms change the image and then increment the image number from the list of results to be displayed
      slideshowChange = setInterval((e) => {
        images.innerHTML = `<img src="${responseData.data.children[i].data.url}" />`
        i++
      }, 5000)
      slideshowChange
    })
    .catch(console.warn)
})

// set a button to revert the page back to initial values, which has slideshow elements hidden and query elements displaying on the page. additionally, resets image counter to 0, clears the query text field & clears the running setInterval
stopButton.addEventListener('click', () => {
  images.style.display = 'none'
  stopButton.style.display = 'none'
  start.style.display = 'block'
  query.style.display = 'block'
  title.style.display = 'block'
  instructions.style.display = 'block'
  i = 0
  query.value = ''
  clearInterval(slideshowChange)
})

// // js varaibles
// let images = []
// let imageIndex = -1
// let value = ''
// let slideshowInterval
// // varaibles for dom elements
// let formContainer, searchForm, searchInput, stopButton, slideshowContainer

// // functions
// function fetchReddit(e) {
//   // prevent the page from refreshing
//   e.preventDefault()
//   // get the value that the user typed into the form
//   value = searchInput.value
//   console.log(value)
//   // return the function early if there is no input
//   if (value === '') {
//     searchInput.placeholder = 'type something in!'
//     return
//   }
//   // put that value in the search url and do a feath to reddit
//   fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
//     .then((anything) => anything.json())
//     .then((redditJson) => {
//       // console.log(redditJson.data.children)
//       // map reddit data to our images array
//       images = redditJson.data.children
//         .map((child) => {
//           return {
//             url: child.data.url,
//             author: child.data.author,
//             ups: child.data.ups,
//             subreddit: child.data.subreddit
//           }
//         })
//         // filter out non image results
//         .filter((image) => {
//           // console.log(image.url.slice(-4))
//           const fileExtension = image.url.slice(-4)
//           return fileExtension === '.jpg' || fileExtension === '.png'
//         })
//       // console.log(images)
//       // start the slideshow
//       slideshow()
//       slideshowInterval = setInterval(slideshow, 1000)
//       // hide the form, show the stop button in its place
//       formContainer.style.display = 'none'
//       stopButton.style.display = 'inline'
//     })
//     .catch(console.warn)
// }

// function clearElement(el) {
//   while (el.firstChild) {
//     el.removeChild(el.firstChild)
//   }
// }

// function stop() {
//   // clear the slideshow
//   clearInterval(slideshowInterval)
//   clearElement(slideshowContainer)
//   // hide stop button
//   stopButton.style.display = 'none'
//   // show form
//   formContainer.style.display = 'block'
//   // reset all state (to be good programers)
//   images = []
//   imageIndex = -1
//   value = ''
// }

// function slideshow() {
//   // increment value
//   imageIndex++
//   // check to make sure we are not out of bounds -- if so, wrap back to 0
//   if (imageIndex >= images.length) {
//     imageIndex = 0
//   }
//   // change slideshow
//   // clear out the slideshow container
//   clearElement(slideshowContainer)
//   // create the dom els we want
//   const newImage = document.createElement('img')
//   const newH2 = document.createElement('h2')
//   const newSubP = document.createElement('p')
//   const newUpsP = document.createElement('p')
//   // sent the props of the dom els
//   newImage.src = images[imageIndex].url
//   newImage.alt = value
//   newImage.width = '600'
//   newH2.innerText = images[imageIndex].author
//   newSubP.innerText = images[imageIndex].subreddit
//   newUpsP.innerText = images[imageIndex].ups
//   // mount the els on the slideshow container
//   slideshowContainer.append(newImage, newH2, newSubP, newUpsP)
// }

// // DOM contented loaded -- load up the varaibles for DOM els
// document.addEventListener('DOMContentLoaded', () => {
//   formContainer = document.querySelector('#formContainer')
//   searchForm = document.querySelector('#searchForm')
//   searchInput = document.querySelector('#searchInput')
//   stopButton = document.querySelector('#stopButton')
//   slideshowContainer = document.querySelector('#slideshowContainer')
//   // mount event listeners
//   searchForm.addEventListener('submit', fetchReddit)
//   stopButton.addEventListener('click', stop)
//   // hide stop button
//   stopButton.style.display = 'none'
// })

// // addEventListener(eventType, callback) {
// //     // do some logic based on the event type
// //     // creates a new event object
// //     const event = {
// //         target: ...,
// //     }
// //     callback(event)
// // }
