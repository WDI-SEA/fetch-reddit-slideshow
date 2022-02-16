const fetchit = qStr => {
  const endpoint = `http://www.reddit.com/search.json?q=${qStr}&limit=10000`
  console.log(endpoint)
  fetch(endpoint)
    .then(fetchObj => fetchObj.json())
    .then(jsonData => {
      console.log(jsonData)
      const arrListing = jsonData.data.children
      console.log(arrListing.length)
      let childImg = document.querySelector('#dataHolder')
      while(childImg.firstChild) {
          childImg.firstChild.remove()
      }
      for (let i = 0; i < arrListing.length; i++) {
        let listData = document.createElement('img')
        listData.src = jsonData.data.children[i].data.url
        listData.style.width= '300px'
        document.querySelector('#dataHolder').appendChild(listData)
        // if img src is invalid, hide the image.
        listData.addEventListener('error', errHandler => listData.style.display='none') 
        
      }
    })
    .catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello')
  let queryString
  document.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.nodeName === 'BUTTON') {
      queryString = document.getElementById('queryString').value
      fetchit(queryString)
    }
  })
})
