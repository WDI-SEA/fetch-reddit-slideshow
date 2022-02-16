const fetchit = qStr => {
  // reddit .json api maximum limit set at 100
  const endpoint = `http://www.reddit.com/search.json?q=${qStr}&limit=100`
  fetch(endpoint)
    .then(fetchObj => fetchObj.json())
    .then(jsonData => {
      console.log(jsonData)
      const arrListing = jsonData.data.children
      console.log(arrListing.length)
      let childImg = document.querySelector('#image-holder')
      while (childImg.firstChild) {
        childImg.firstChild.remove()
      }
      for (let i = 0; i < arrListing.length; i++) {

        let newImgContainer = document.createElement('div')
        newImgContainer.width = 'fit-content'
        newImgContainer.style.border = '.1rem solid grey'
        newImgContainer.id = `id${i}`
        document.querySelector('#image-holder').appendChild(newImgContainer)

        let listData = document.createElement('img')
        listData.src = jsonData.data.children[i].data.url
        listData.style.width = '400px'        
        document.querySelector(`#id${i}`).appendChild(listData)
        // if img src is invalid, hide the image.
        listData.addEventListener(
          'error',
          errHandler => (newImgContainer.style.display = 'none')
        )
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
      document.getElementById('input-box').style.display ='none'
    }
  })
})
