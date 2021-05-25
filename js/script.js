document.addEventListener("DOMContentLoaded", () => {
    
    const requestUrl = "http://www.reddit.com/search.json?q="
    const form = document.querySelector("form")
    let redditImages = []
    let filterImg = []
    const imageReel = document.querySelector("div")
    let index = 0 


   form.addEventListener("submit", (e) => {
        e.preventDefault()

        let userInput = input.value

        fetch(requestUrl + userInput)

        .then(response => {
            return response.json()
        })

        .then(responseJson => {
            let handleImagePath = responseJson.data.children 
           redditImages = handleImagePath.map(path => {
              return path.data.url
           })
           filterImg = redditImages.filter(image => {
               return image.includes(".jpg")
           })
           console.log(filterImg)
           handleImageSlide()
        })
        .catch(err => {
            console.log(err)
        })
   })


 
   function handleImageSlide(){

    let addImg = document.createElement("img")
    //    addImg.src = filterImg[index]
       addImg.style.width = "300px"
       addImg.style.height = "300px"
    //    imageReel.appendChild(addImg)
        

        setInterval( function () {
            index++
            if(index >= redditImages.length){
                index = 0 
            }
            addImg.src = filterImg[index]
            imageReel.appendChild(addImg)
            
        }, 2000)


       
   }
    
   

})