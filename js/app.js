console.log(`🌊 js loaded 🌊`)

//varibles & event listeners to be used
let redditImg = document.getElementById('reddit-img')
let searchInput = document.getElementById('search-input')
let redditImgUrl = [] //need to establish up here as empty
let imgValue = null
let redditSubmit = document.getElementById('reddit-submit')
let endSlides = document.getElementById('end-slides')
let redditForm = document.getElementById('reddit-form')
let timer = null //must be declared first to hold interval
let imgTime = 2000
redditForm.addEventListener("submit", function(e) {start(e)})
endSlides.addEventListener("click", function() {endSlides()})


//functions to fetch json object and run slideshow logic
grabImg = (link) => {
  fetch(link).then(res => {
    return res.json()
  }).then(data => {
    redditImgUrl = []
    let children = data.data.children
    children.forEach(function(child){ //only grab jpgs for display
      if( child.data.url.slice(-4) === `.jpg`) {
        redditImgUrl.push(child.data.url)
      }
    })
    imgValue = 0
    nextImg()
    timerTick()
  })
}

start = (e) => {
    e.preventDefault()
    grabImg(`https://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`)
    clearInterval(timer)
}

startTick = () => {
  imgValue++ //have to begin incrementing first
  if (imgValue >= redditImgUrl.length){ 
    imgValue = 0
  }
  nextImg()
}

timerTick = () => {
    timer = setInterval(startTick, imgTime)
}

endSlides = () => {
    clearInterval(timer)
}

nextImg = () => {
    redditImg.src = redditImgUrl[imgValue] //set new source in element to show next image
}
