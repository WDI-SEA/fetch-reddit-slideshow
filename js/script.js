document.addEventListener('DOMContentLoaded', () => {
  ////
  ////
  // Store URL of query
  const requestURL = 'http://www.reddit.com/search.json?q='
  let inputForm = document.querySelector('#form')
  // let peopleList = document.querySelector('#peopleList')
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
          //   if (results[i].data.url.endsWith(".jpeg") || results[i].data.url.endsWith(".png") || results[i].data.url.endsWith(".jpg")){
          //     imgArray.push(results[i].data.url);
          // } else {
          //     console.log("Uh oh! Nothing to see here. Sorry!");
          // }

          if (
            picRes[i].data.url.endsWith('.jpeg') ||
            picRes[i].data.url.endsWith('.png') ||
            picRes[i].data.url.endsWith('.jpg')
          ) {
            setTimeout(function () {
              document.querySelector(
                '#slideshow'
              ).innerHTML = `<img src="${picRes[i].data.url}" />`
            }, 3000)
            console.log(picRes[i].data.url)
          }
        }
      })
      // .catch -> catch errors
      .catch((err) => {
        console.log(err)
        return err
      })
  })
  console.log(document.querySelector('#slideshow'))
  // document.querySelector('#slideshow').innerHTML = '<img src'
  // append +nsfw:no to that string
  // grab dom elements
  // form id #form
  // slideshow area #slideshow
  ////
  ////
})
