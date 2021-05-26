document.addEventListener("DOMContentLoaded", () => {

// App state 
    //interval
    let showInterval 
    //hold imgs
    let imgResponse = []
    // index of current img being shown - So Slides can point to position in array
    let imageIndex = 0

    // store constant url for form dom element; request url
    const requestUrl = "https://www.reddit.com/search.json?q="
    const inputForm = document.querySelector('#form')
    let userInput = document.querySelector('#input')
    const displayImg = document.querySelector('#display-img')
    const stop = document.querySelector('#stop')

    inputForm.addEventListener("submit", fetchData)
    stop.addEventListener('click', stopShow)
    stop.style.display = 'none'
    
    // REQUEST DATA
    function fetchData(e) {
    // take form element and prevent default behavior
    // inputForm.addEventListener("submit", (e) => {
        //Prevent refresh
        e.preventDefault()
        inputForm.style.display = 'none'
    
        // get user inputed number
        userInput = input.value
        console.log(userInput)
  
        // make fetch request to const api url with given user number
        fetch(requestUrl + userInput + '+nsfw:no')
        // console.log(userInput)
        // .then --> take response data and format
        .then((res) => {
            return res.json()
        })
        // .then --> use response JSON data
        .then((jsonData) => {
            imgResponse = jsonData.data.children.map(child => {
                return {
                    url: child.data.url,
                    subreddit: child.data.subreddit
                }
            })
            .filter(image => {
                //slice from the end to find exts
                const fileExtension = image.url.slice(-4)
                if (fileExtension === '.jpg' || fileExtension === '.png') return true
                return false
            })
            //set the interval for show
            showInterval = setInterval(changeSlide, 1500)
            stop.style.display = 'inline-block'

            // invoke the show callbcak
            changeSlide()
            
            // .map(element => element.data.url_overridden_by_dest)
            // .filter(imgType => imgType === '.jpg' || imgType === '.png')
            // if (imgResponse.endsWith('.jpg') || imgResponse.endsWith('.png')) {
            // console.log(imgResponse)
            // return imgResponse
            // }

            //new solut
            // images = imageJsonResults.map(function(post){
            //     return {
            //         subreddit: post.data.subreddit,
            //         title: post.data.title,
            //         url: post.data.url
            //     }
            // })
            // .filter(function(result) {
            //     return result.url.includes('i.imgur') || result.url.includes('i.redd')
            
            
        })
        // .catch --> catch errors
        .catch((err) => console.log(err))
        
    // })   
    }
    //callback for interval
    function changeSlide() {
        //increment show index
        imageIndex++
        //rest the imamge index if it is out of bounds
        if (imageIndex >= imgResponse.length) { 
            imageIndex = 0
        }
        console.log(displayImg)
        //empty  out the div of any elem
        while(displayImg.firstChild) {
            displayImg.removeChild(displayImg.firstChild)
        }
        //update DOM
        const imageSlide = document.createElement('img')
        imageSlide.src = imgResponse[imageIndex].url
        imageSlide.alt = imgResponse[imageIndex].author
        imageSlide.width = '400'
        
        displayImg.appendChild(imageSlide)
    }

    // start show
    // function startShow(){
    //     let showInterval = setInterval(changeSlide, 1000)
    //     stop.style.display = 'block'
    // }

   // resets app to init state
    // function resetShow() {
    //     clearInterval(showInterval)
    //     // clearShow()
    //     // imageIndex = -1
    //     imgResponse = []
    // }

    // stop
    function stopShow() {
        // resetShow()
        clearInterval(showInterval)
        imgResponse = []
        inputForm.style.display = 'flex'
        // stop.style.display = 'none'
        inputForm.reset()
    }
    stop.addEventListener('click', stopShow)



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
