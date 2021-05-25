
document.addEventListener("DOMContentLoaded", () => {
  // store constant url for form dom element; request url
  const requestUrl = "http://www.reddit.com/search.json?q="
  let inputForm = document.querySelector("form")
  let redditImage = document.querySelector("#displayImages")
  let imageResults = []
  let x = 0


  // REQUEST DATA
  // take form element and prevent default behavior
  inputForm.addEventListener('submit', (e) => {
      e.preventDefault()
      // get user inputed number
      let userInput = search.value
      
      // make fetch request to const api url with given user number
      console.log('this is userinput:  ' + requestUrl + userInput + '+nsfw:no')
      fetch(requestUrl + userInput + '+nsfw:no')
          // .then -->
          .then((result) => {
              return result.json()
                
            })
            // console.log(requestUrl + userInput + '+nsfw:no') <--- this shows the user input in console.
          // .then --> use response JSON data
          .then((jsonData) => {
            imageResults = jsonData.data.children
                .filter(element => String(element.data.url).includes(".jpg"))
                .map(imageData => imageData.data.url)
             console.log(imageResults)

             redditImage.src = imageResults[x]
             console.log(redditImage)

            //   showImage(x)
            
          })
          // .catch --> catch errors
          .catch((err) => {
              console.log(err)
              return err
          }) 
      })  


      
      // ~~~~~~~~~~~~~~~~~~~~~
  // RESPONSE DATA
  // collect formatted data
    //   function showImage() {
    //     x++
    //     if (x >= images.length) {
    //         x = 0
    //     }
    //     redditImages.src = images[x]
    //   } 



}) // <--- this should be the end of the script