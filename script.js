// declare globals and consts
const API_URL_BASE = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2000
let currentImages = []
let currentIndex = 0
let interval = null


//declare some event handler
//form submit
document.getElementById('search-form').addEventListener('submit', (e) => {
  //prevent the forms behavior of refreshing the page.
  e.preventDefault()

let userQuery = document.getElementById('query').value

if(userQuery) {
fetchRedditt(userQuery)


}else{
  console.log('please type something')
  }
})


//stop button click
document.getElementById('stop-button').addEventListener('click', (e) =>{
document.getElementById('search-form').reset();
location.reload(true);

})
// helper functions
// fetch function
const fetchRedditt = (userQuery) => {
  console.log('you will search reddit for', userQuery)
  fetch(API_URL_BASE + userQuery)
  .then(response => response.json())
  .then(jsonData => {
    console.log('success')
    console.log(jsonData.data.children)
    let results = jsonData.data.children.filter((item) => {
      console.log(item.data.post_hint)
      return item.data.post_hint == 'image'
    }).map((item) => {
      return {
        title: item.data.title,
        url: item.data.url,
        subreddit: item.data.subreddit,
        upvotes: item.data.ups,
        downvotes: item.data.downs,
        gold: item.data.gilded > 0
      }
    })
    console.log(results)
    currentImages = results
    startSlideshow()
  })
  .catch(err => {
    console.log('error', err)
  })
  }


//start the slideshow
const startSlideshow = () => {
  console.log('start')
  //kick off the intervall
  //hide Search
  document.getElementById('search-box').style.display = 'none'
  //show slideshow
  document.getElementById('slideshow').style.display = 'inline-block'

  displayCurrent()
  //display first image


interval = setInterval(changeImage, INTERVAL_DELAY)

}
const changeImage = () => {
  //update currentImage being shown
  //console.log('hello')
  currentIndex += 1
  if(currentIndex >= currentImages.length){
    currentIndex = 0
  }

  //placr that image into jsonData
  displayCurrent()
}

const displayCurrent = () => {
  //empty previous images
  document.getElementById('results').innerHTML = ''

//use for each if you want a static page of pics
// will need to replace currentImages[currentIndex] down below w e and uncomment this function
//currentImages.forEach(e => {


  //create an image tag
  let img = document.createElement('img')
  img.src = currentImages[currentIndex].url
  console.log(currentImages[currentIndex].url)
  img.alt = currentImages[currentIndex].title

  let h3 = document.createElement('h3')
  h3.textContent = currentImages[currentIndex].title

  document.getElementById('results').append(img)

  document.getElementById('results').append(h3)


//})
//updates the next image
}
