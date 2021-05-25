document.addEventListener('DOMContentLoaded', () => {
  ////
  ////
  // Store URL of query
  const requestURL = 'http://www.reddit.com/search.json?q='
  let inputForm = document.querySelector('#form')
  // let peopleList = document.querySelector('#peopleList')
  // let picRes = []

  // REQUEST DATA
  // Take form element and prevent default behavior

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get user inputted number
    let userInput = input.value
    redString = `${requestURL}${userInput}+nsfw:no`

    //Make FETCH request to const API URL with given user number
    fetch(redString)
      // .then --> take response data and format
      .then((redString) => {
        // console.log(redString)
        console.log('response came back')
        return redString.json()
        console.log(redString.json)
      })
      .then((jsonData) => {
        picRes = jsonData.results
        console.log(picRes)
        // console.log(picRes)
        // console.log(jsonData)
        // domPeopleList(peopleRes)
      })
      // .catch -> catch errors
      .catch((err) => {
        console.log(err)
        return err
      })
  })

  // append +nsfw:no to that string
  // grab dom elements
  // form id #form
  // slideshow area #slideshow
  ////
  ////
})
