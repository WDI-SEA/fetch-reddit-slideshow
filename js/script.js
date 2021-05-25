document.addEventListener('DOMContentLoaded', () => {
  ////
  ////

  const requestURL = 'http://www.reddit.com/search.json?q='
  let inputForm = document.querySelector('#form')
  document.getElementById('slideshow').style.display = 'none'
  document.querySelector('.btnClass').style.display = 'none'

  let picRes = []
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.header').style.display = 'none'
    document.getElementById('slideshow').style.display = ''
    document.querySelector('.btnClass').style.display = ''
    // Get user inputted number
    let userInput = input.value
    redString = `${requestURL}${userInput}+nsfw:no`
    console.log(redString)

    fetch(redString)
      .then((res) => {
        console.log('response came back')
        return res.json()
        console.log(redString)
      })
      .then((jsonData) => {
        picRes = jsonData.data.children

        for (let i = 0; i < picRes.length; i++) {
          if (
            picRes[i].data.url.endsWith('.jpeg') ||
            picRes[i].data.url.endsWith('.png') ||
            picRes[i].data.url.endsWith('.jpg')
          ) {
            // push to new arr
            // iterate through that
            // document.cre
            setInterval(function printImg() {
              document.querySelector(
                '#slideshow'
              ).innerHTML = `<img src="${picRes[i].data.url}" />`
            }, 3000)
          }
        }
      })
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
