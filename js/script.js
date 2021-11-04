let resultIndex = 0
let form = document.getElementById("form")
let stopButton = document.querySelector("button")
let headerOne = document.querySelector("h1")
let headerTwo = document.querySelector("h2")
document.addEventListener("DOMContentLoaded", () => {
    //change visibility of images
    slideshow.style.display = "none"
    // add event listener for submit button in form
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        const searchTerm = userInput.value.replaceAll(" ", "+")
        fetch(`https://www.reddit.com/search.json?q=${searchTerm}&raw_json=1`)
        .then((responseData)=>{
            return responseData.json()
        })
        // function to select photos from reddit
        .then((jsonData)=>{
            // make form and headings disappear while photos are cycling
            headerOne.style.visibility = "hidden"
            headerTwo.style.visibility = "hidden"
            form.style.visibility = "hidden"
            let resultsArray = jsonData.data.children
            let photoArray = resultsArray.map((resultObj)=>{
                if(resultObj.data.preview){
                    return resultObj.data.preview.images[0].source.url
                } else {
                    return "No image"
                }
            })
            // filter results to only ones with images
            const filteredURLs = photoArray.filter((url)=>{
                if(url==="No image"){
                    return false
                }
                else {
                    return true
                }
            })
            // loop through photos
            const changeSrc = () => {
                if(resultIndex<filteredURLs.length){
                    slideshow.setAttribute("src", filteredURLs[resultIndex])
                    resultIndex++
                } 
                else{
                    resultIndex = 0
                }
            }
            changeSrc()
            slideshow.style.display = "block"
            // set Interval for photos
            const changeSlide = setInterval(changeSrc, 3000)
            // make stop button that reverts back to landing page (clears)
            // add event listener for stop button
            stopButton.addEventListener("click", ()=>{
                clearInterval(changeSlide)
                document.getElementById("userInput").innerText = ""
                slideshow.style.display = "none"
                headerOne.style.visibility = "visible"
                headerTwo.style.visibility = "visible"
                form.style.visibility = "visible"
                resultIndex = 0
            })
        })    
        .catch((error)=>{
            console.log("ERROR:\n", error)
        })
    })
})








//     }
//     
//     const getPhoto = (objSearched) => {
//         let photo = document.createElement('img')
//         photo.src = objSearched.data.thumbnail
//         thumbnailPhotos = objSearched.data.thumbnail
//         allPictures.appendChild(photo)
//         photoArray.push(thumbnailPhotos)
//     }                
//     // console.log(photoArray)
//     let i = 0
//     const startSlideshow = () => {
//         for (i = 0; i < photoArray.length; i++){
//             console.log("this is my current photo:\n", photoArray[i])
//             photoArray[i]
//         }
//     }
//      
//     setInterval(startSlideshow, 2000)
// })
// for(let i=0; i<photoArray.length; i++){
            //     let redditPhoto = document.createElement("img")
            //     redditPhoto.setAttribute("src", photoArray[i])
            //     allPictures.appendChild()
            // }