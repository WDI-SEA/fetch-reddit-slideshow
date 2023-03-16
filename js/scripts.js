const API_URL = 'https://www.reddit.com/search.json?q='
const INTERVAL_DELAY = 2500
let currentImages = []
let currentIndex = 0
let interval = null


document.getElementById('search-form').addEventListener('submit', e => {
  e.preventDefault()
  let userQuery = document.getElementById('query').value
  if (userQuery) {
    fetchReddit(userQuery)
    document.getElementById('query').value = ''
  }
  else {
    console.log('Empty string!')
  }
})


document.getElementById('stop-button').addEventListener('click', () => {
  document.getElementById('slideshow-container').style.visibility = 'hidden'
  document.getElementById('form-container').style.display = 'block'
  clearInterval(interval)
})

const fetchReddit = query => {
  console.log('Performing fetch!', query)
  fetch(API_URL + query + '+nsfw:no')
  .then(response => response.json())
  .then(jsonData => {
    currentImages = jsonData.data.children.map(p => {
      return {
        title: p.data.title,
        url: p.data.url_overridden_by_dest,
        subreddit: p.data.subreddit_name_prefixed,
        upvotes: p.data.ups,
        gold: p.data.gilded > 0 ? true : false,
        posthint: p.data.post_hint
      }
    }).filter(p => {
      return p.posthint === 'image'
    })
    console.log('Cleaned up posts', currentImages)
    startSlideshow()
  })
  .catch(err => {
    console.log('ERROR', err)
  })
}

const startSlideshow = () => {
  console.log('Starting slides')
  currentIndex = 0
  placeImage()
  document.getElementById('form-container').style.display = 'none'
  document.getElementById('slideshow-container').style.visibility = 'visible'
  interval = setInterval(changeImage, INTERVAL_DELAY)
}

const changeImage = () => {
  currentIndex++
  if (currentIndex >= currentImages.length) {
    currentIndex = 0
  }
  placeImage()
}

const placeImage = () => {
  document.getElementById('result').innerHTML = ''
  let img = document.createElement('img')
  img.src = currentImages[currentIndex].url
  img.alt = currentImages[currentIndex].title
  let h2 = document.createElement('h2')
  h2.textContent = currentImages[currentIndex].title + (currentImages[currentIndex].gold ? ' 🏆 ' : '')
  let h3 = document.createElement('h3')
  h3.textContent = currentImages[currentIndex].subreddit
  h3.style.fontWeight = 'bold'
  document.getElementById('result').append(img)
  document.getElementById('result').append(h2)
  document.getElementById('result').append(h3)
}
