let slideShowInterval
let imageIndex = -1
let imgList = []
function fetchit (qStr) {  
  // reddit .json api maximum limit set at 100

  const endpoint = `http://www.reddit.com/search.json?q=${qStr}&limit=100`

  fetch(endpoint)
    .then(fetchObj => fetchObj.json())
    .then(jsonData => {
      // map json data to another array
      const arrListing = jsonData.data.children.map(child => {
        return {
          url: child.data.url,
          sub: child.data.subreddit,
          author: child.data.author
        }
      })
      // filter json data to another array with images only
      imgList = arrListing.filter((imgURL) => {
        if (checkURL(imgURL.url)) {
          return imgURL.url
        }
      })      
      
    })
    slideShowInterval = setInterval(imageit, 5000)
    
}

function checkURL (url) {
  if (typeof url !== 'string') {
    return false
  } else {
    return url.match(/\.(jpg|jpeg|gif|png)$/) != null
  }
}

function imageit() {
  document.querySelector('#reset').style.display='inline-block'
  imageIndex++  
  if (imageIndex >= imgList.length) imageIndex = 0
  console.log(imgList[imageIndex])

  let parent = document.querySelector('#image-holder')
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
  let listData = document.createElement('img')
  listData.src = imgList[imageIndex].url
  document.querySelector('#image-holder').appendChild(listData)
  // if img src is invalid, hide the image.
  listData.addEventListener(
    'error',
    errHandler => (listData.style.display = 'none')
  )
}
function reinitialise () {
  location.reload()
}

let queryString
let pageMessage = ''
document.addEventListener('click', e => {
  e.preventDefault()

  if (e.target.id === 'search') {
    queryString = document.getElementById('queryString').value
    if (queryString.length == 0) {
      document.querySelector('#image-holder').innerText =
        'Empty search not accepted.'
    } else {
      document.querySelector('#image-holder').innerText = 'Loading slideshow...'
      document.getElementById('input-box').style.display = 'none'
      fetchit(queryString)
    }
  } else if (e.target.id === 'reset') {
    document.getElementById('input-box').style.display = 'initial'
    reinitialise()
  }
})
