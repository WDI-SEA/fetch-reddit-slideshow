const search = document.querySelector('.search')
const imgColl = document.querySelector('.image-collection')
const imgSearch = document.querySelector('#img-search')
const searchBtn = document.querySelector('#search-button')
const body = document.querySelector('body')
const stopBtn = document.createElement('button')
stopBtn.classList.add('return')
stopBtn.innerText = 'Return'

let index = 0

// console.log(search, imgColl, searchBtn, stopBtn)

const urlReddit = 'http://www.reddit.com/search.json?q='
// const options = {
//   header: {
//     'Content-Type': 'application/json'
//   }
// }

let imgArr = []
let slideStart = null
let slideStop = null
const slideSpeed = 1500
const animateSpeed = 1800

const beginSlideShow = () => {
  // Clear search bar
  toggleSearch('OFF')

  fetch(`${urlReddit}${imgSearch.value}`)
  .then(res => res.json())
  .then(redditJson => {
    // Collect thumbnails into an array
    imgArr = redditJson.data.children.map(thread => thread.data.thumbnail)
    imgArr = imgArr.filter(img => img !== 'self')
    imgArr = imgArr.filter(img => img !== 'nsfw')
    imgArr = imgArr.filter(img => img !== 'image')
    imgArr = imgArr.filter(img => img !== 'default')
    imgArr = imgArr.filter(img => img !== 'undefined')
    
    // Begin slideshow
    const imgOne = document.createElement('img')
    const imgTwo = document.createElement('img')
    const arrOne = imgArr[index]
    const arrTwo = imgArr[index + 1]
    imgOne.src = arrOne
    imgTwo.src = arrTwo
    imgColl.append(imgOne, imgTwo)
    slideStart = setInterval(animateSlide, slideSpeed)
    // console.log(imgArr)
    
    // Add button to stop slideshow
    body.append(stopBtn)
    stopBtn.addEventListener('click', stopSlideShow)
  })
  .catch(console.warn)
}

const toggleSearch = (toggle) => {
  if(toggle === 'OFF') {
    search.style.display = 'none';
  }
  if(toggle === 'ON') {
    search.style.display = '';
    while(imgColl.firstChild) {
      imgColl.firstChild.remove()
    }
    body.lastElementChild.remove()
  }
}

const stopSlideShow = () => {
  stopBtn.removeEventListener('click', stopSlideShow)
  clearInterval(slideStart)
  toggleSearch('ON')
}

const animateSlide = () => {
  // Check if content already exists
  while(imgColl.firstChild) {
    imgColl.firstChild.remove()
  }

  // increment index
  index++
  if(index >= imgArr.length) {index = 0}
  let indexNext = index + 1
  if(indexNext >= imgArr.length) {indexNext = 0}

  // Create Elements for display
  const imgOne = document.createElement('img')
  const imgTwo = document.createElement('img')
  
  // Set variables for loop
  const arrOne = imgArr[index]
  const arrTwo = imgArr[indexNext]
  imgOne.src = arrOne
  imgTwo.src = arrTwo
  // console.log(imgOne, imgTwo)
  
  // // Create Keyframes for animation
  // const imgOff = new KeyframeEffect([
  //   imgOne,
  //   { transform: 'translateX(0px) opacity(1)' },
  //   { transform: 'translateX(-200px) opacity(0)' }
  // ],
  // { duration: animateSpeed, easing: 'ease-in' }
  // )
  // const imgOn = new KeyframeEffect([
  //   imgTwo,
  //   { transform: 'translateX(200px) opacity(0)' },
  //   { transform: 'translateX(0px) opacity(1)' }
  // ],
  // { duration: animateSpeed, easing: 'ease-in' }
  // )
  
  // // Create and play animations
  // const imgOneAnimate = new Animation(imgOff, document.timeline)
  // const imgTwoAnimate = new Animation(imgOn, document.timeline)
  // imgOneAnimate.play()
  // imgTwoAnimate.play()
  
  imgColl.append(imgOne, imgTwo)
}

document.addEventListener('DOMContentLoaded', () => {
  searchBtn.addEventListener('click', beginSlideShow)
})