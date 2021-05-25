document.addEventListener('DOMContentLoaded', () => {
  ////
  ////
  // Store URL of query
  const requestURL = 'http://www.reddit.com/search.json?q='
  let inputForm = document.querySelector('#form')
  // addEventListener('click', () => {
  //   document.querySelector('.subBtn')
  //   document.querySelector('.header').style.display = 'none'
  //   console.log('clicked')
  // })
  let picRes = []

  // REQUEST DATA
  // Take form element and prevent default behavior

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get user inputted number
    let userInput = input.value
    redString = `${requestURL}${userInput}+nsfw:no`
    console.log(redString)

    //Make FETCH request to const API URL with given user number
    fetch(redString)
      // .then --> take response data and format
      .then((res) => {
        // console.log(redString)
        console.log('response came back')
        return res.json()
        console.log(redString)
      })
      .then((jsonData) => {
        picRes = jsonData.data.children
        // console.log(picRes)

        for (let i = 0; i < picRes.length; i++) {
          if (
            picRes[i].data.url.endsWith('.jpeg') ||
            picRes[i].data.url.endsWith('.png') ||
            picRes[i].data.url.endsWith('.jpg')
          ) {
            // push to new arr
            // iterate through that

            setInterval(function printImg() {
              document.querySelector(
                '#slideshow'
              ).innerHTML = `<img src="${picRes[i].data.url}" />`
            }, 3000)
          }
        }
      })

      // .catch -> catch errors
      .catch((err) => {
        console.log(err)
        return err
      })
  })
  clearInterval(printImg())
  console.log(document.querySelector('#slideshow'))

  ////
  ////
})
