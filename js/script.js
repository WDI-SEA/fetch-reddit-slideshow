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
            let i = 0
            const startSlideshow = () => {
                for (i = 0; i < photoArray.length; i++){
                    console.log("this is my current photo:\n", photoArray[i])
                    photoArray[i]
                }
            }
            // set Interval for photos 
            setInterval(startSlideshow, 2000)
        })
        .catch((error)=>{
            console.log("ERROR:\n", error)
        })
    })
})


// loop through photos
// make form and headings disappear while photos are cycling
// make stop button that reverts back to landing page (clears)

//change visibility of divs/images