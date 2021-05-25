document.addEventListener("DOMContentLoaded", () => {

    // store constant url for form dom element; request url
    const requestUrl = "https://www.reddit.com/search.json?q="
    const inputForm = document.querySelector('form')
    const displayImg = document.querySelector('display-img')
    const stop = document.querySelector('#stop')
    let imgResponse = []

    inputForm.addEventListener("submit", fetchData)
    stop.addEventListener('click', stopShow)
    
    // REQUEST DATA
    function fetchData(e) {
    // take form element and prevent default behavior
    // inputForm.addEventListener("submit", (e) => {
        //Prevent refresh
        e.preventDefault()
        inputForm.style.display = 'none'
  
        // get user inputed number
        let userInput = input.value
        console.log(userInput)
  
        // make fetch request to const api url with given user number
        fetch(requestUrl + userInput + '+nsfw:no')
        // .then --> take response data and format
        .then((res) => {
            return res.json()
        })
        // .then --> use response JSON data
        .then((jsonData) => {
            imgResponse = jsonData.data.children
            
            .map(imgResponse => imgResponse.data.url_overridden_by_dest)
            // .filter(imgType => imgType === '.jpg' || imgType === '.png')
            // if (imgResponse.endsWith('.jpg') || imgResponse.endsWith('.png')) {
            // console.log(imgResponse)
            // return imgResponse
            // }
            console.log(imgResponse)
            
        })
        // .catch --> catch errors
        .catch((err) => {
            console.log(err)
            return err
        })
    // })   
    }


    // start show
    function startShow(){
        let showInterval = setInterval(changeSlide, 1000)
        stop.style.display = 'block'
    }

   // resets app to init state
    function resetShow() {
        clearInterval(showInterval)
        // clearShow()
        // imageIndex = -1
        imgResponse = []
    }

    // stop
    function stopShow() {
        // resetShow()
        inputForm.style.display = 'flex'
        stop.style.display = 'none'
        inputForm.reset()
    }
            //tried to functionify but didnt work        
        // function filterdImgs(imgResponse) {
        //     imgResponse = map(imgResponse => imgResponse.data.url_overridden_by_dest)
        //     // .filter(imgType => imgType === '.jpg' || imgType === '.png')
        //     if (imgResponse.endsWith('.jpg') || imgResponse.endsWith('.png')) {
        //       console.log(imgResponse)
        //       return imgResponse
        //   }
        // }


      // async function searchReddit() {
      //     try {
      //         let res = await fetch(requestUrl + )
      //         let jsonData = await res.json()
      //         jsonData.data.children.forEach((elem) => {
      //             console.log(elem.data.url_overridden_by_dest)
      //         })
      //         searchRes = jsonData.results
      //         domResList(searchRes) 
      //     } catch(err)
      //         console.log(err)
      //         return err
      // }

//   jsonData.data.children.forEach((elem) => {
//     console.log(elem.data.url_overridden_by_dest)
// })


})
