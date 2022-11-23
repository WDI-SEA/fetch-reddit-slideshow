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
      // change the innerHTML of a pre-built <p> designed to house the images, placed outside of the setInterval so that the slideshow starts immediately instead of 5000ms after the button is clicked
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
