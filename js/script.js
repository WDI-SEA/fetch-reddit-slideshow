const requestURL = "https://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        
        fetch(requestURL+input.value)
        .then((responseData)=>{
            return responseData.json()
        })
        .then((jsonData)=>{
            let photoArray = []
            // function to select photos from reddit
            const getPhoto = (objSearched) => {
                let photo = document.createElement('img')
                photo.src = objSearched.data.thumbnail
                thumbnailPhotos = objSearched.data.thumbnail
                allPictures.appendChild(photo)
                photoArray.push(thumbnailPhotos)
            }
            // console.log(photoArray)
            jsonData.data.children.forEach(getPhoto)
            const startSlideshow = () => {
                let i = 0
                while (i < 1000) {
                    photoArray[i]
                    i++
                }
            }
            const intervalSlideshow = () => {
                setInterval(startSlideshow, 2000)
            }
        })
        .catch((error)=>{
            console.log("ERROR:\n", error)
        })
    })
})


// loop through photos
// set Interval for photos 
// make form and headings disappear while photos are cycling
// make stop button that reverts back to landing page (clears)

//change visibility of divs/images

// const redditImageGrab = (url) => {
//     if(url.includes(".jpg") && url.startsWith("https://i.redd.it/")){
//         return url
//     }
//     if(url.includes(".png") && url.startsWith("https://i.redd.it/")){
//         return url
//     }
    // return url.includes(".jpg") && url.startsWith("https://i.redd.it/") 
    // || url.includes(".png") && url.startsWith("https://i.redd.it/")
// }
// const filteredPhotos = photoArray.filter(redditImageGrab())