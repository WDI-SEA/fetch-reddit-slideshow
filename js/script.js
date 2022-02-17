function fetchit (qStr) {
  const imgList = []
  // reddit .json api maximum limit set at 100
  const endpoint = `http://www.reddit.com/search.json?q=${qStr}&limit=100`
  fetch(endpoint)
    .then(fetchObj => fetchObj.json())
    .then(jsonData => {
      const arrListing = jsonData.data.children
      for (let i = 0; i < arrListing.length; i++) {
        if (checkURL(jsonData.data.children[i].data.url)) {
          setTimeout(function () {
            imageit(jsonData.data.children[i].data.url)
            document.getElementById('reset').style.display = 'inline-block'
          }, 2000 * i)
        }
      }
    })
    .catch(err => console.log(err))
}

function checkURL (url) {
  if (typeof url !== 'string') return false
  return url.match(/\.(jpg|jpeg|gif|png)$/) != null
}

function imageit (imgURL) {
  let parent = document.querySelector('#image-holder')
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
  let listData = document.createElement('img')
  listData.src = imgURL
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
