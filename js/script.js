addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1')
  const stopButton = document.querySelector('#stopButton')
  const startButton = document.querySelector('#startButton')
  const input = document.querySelector('#input')
  const images = document.createElement('img')
  const h2 = document.querySelector('h2')
  h2.style.display = 'none'
  let value = ""
  let imageArr = [];
  let pause
function hide() {
      h1.style.display = 'none'
      input.style.display = 'none'
      startButton.style.display = 'none'
      stopButton.style.display = 'block'
       setTimeout(() => {
          h2.style.display = 'block'
      }, 0)
  }

  function show() {
      h1.style.display = 'block'
      input.style.display = 'block'
      startButton.style.display = 'block'
      stopButton.style.display = 'none'
  }

 
  startButton.addEventListener('click', (e) => {
      e.preventDefault()
      value = input.value

      hide()

      setTimeout(() => {
          h2.style.display = 'none'
          images.style.display = 'block'
      }, 2050)

      const url = `https://www.reddit.com/search.json?q=${value}&over_18=false`

      fetch(url)
          .then(theData => {
              return theData.json()
          })
          .then(dataJson => {
              imageArr = [];
              for(let i = 0; i < dataJson.data.children.length; i++) {
                  if(dataJson.data.children[i].data.domain === "i.redd.it"){
                      imageArr.push(dataJson.data.children[i].data.url)
                  }

              }
              return imageArr
          })
          .then(theArray => {

              let x = 0;
              pause = setInterval(() => {
                  images.src = `${theArray[x]}`
                  images.alt = `${value} result`
                  area.append(images)
                  x++
                  if(x === theArray.length) x = 0;
                  console.log(theArray[x])
              }, 2000)

          })
          .catch(err => {
              console.warn(err)
          })
  })

  stopButton.addEventListener('click', (e) => {
      e.preventDefault()

      show()

      clearInterval(pause)
      images.style.display = 'none'
  })
}) 
