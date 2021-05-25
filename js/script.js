
document.addEventListener("DOMContentLoaded", () => {
    // store constant url for form dom element; request url
    const requestUrl = "https://www.reddit.com/search.json?q="
    let inputForm = document.querySelector("form")
    let group = document.querySelector("#group")
    let redditImage = document.querySelector("#displayImages")
    let stopButton = document.querySelector('#stop')
    let title = document.querySelector('#title')
    let subtitle = document.querySelector('#subtitle')
    let imageResults = []
    let imageIndex = 0
    let intervalTimer = null

  
    // REQUEST DATA
    // take form element and prevent default behavior
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // get user inputed number
        let userInput = search.value
        
        console.log('*** submit event!')
        
        // make fetch request to const api url with given user number
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
              
              showImage();
              intervalTimer = setInterval(showImage, 2000);
              console.log('*** saved intervalTimer: ', intervalTimer);
            })
            // .catch --> catch errors
            .catch((err) => {
                console.log(err)
                return err
            }) 
        })  
  
        stopButton.addEventListener("click", e => {
            e.preventDefault()
            stopImage()
        })
  
        // ~~~~~~~~~~~~~~~~~~~~~
  //   RESPONSE DATA
  //   collect formatted data
  function showImage() {
      console.log('*** showImage interval...');
    redditImage.src = imageResults[imageIndex]
    imageIndex = (imageIndex + 1) % imageResults.length;
    title.style.display = "none"
    subtitle.style.display = "none"
    group.style.display = "none"
    stopButton.style.display = "block"
    redditImage.style.display = "block"

  } 
  
  function stopImage() {
      console.log('you clicked stop, intervalTimer: ', intervalTimer);
    clearInterval(intervalTimer)
    imageResults = []
    redditImage.src = ""
    imageIndex = 0
    title.style.display = "block"
    subtitle.style.display = "block"
    group.style.display = "block"

    stopButton.style.display = "none"
    redditImage.style.display = "none"

  }
  




  }) // <--- this should be the end of the script
  