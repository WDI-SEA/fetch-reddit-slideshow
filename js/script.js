const requestURL = "https://www.reddit.com/search.json?q="
let photoArray = []

document.addEventListener("DOMContentLoaded", () => {

    form.addEventListener("submit", (e)=>{
        e.preventDefault()

        fetch(requestURL+input.value)
        .then((responseData)=>{
            return responseData.json()
        })
        .then((jsonData)=>{
            // function to select photos from reddit
            const getPhoto = (objSearched) => {
                let photo = document.createElement('img')
                photoArray.push(objSearched.url)
                photo.src = objSearched.data.url
                // console.log("this is the photo.src\n", photo.src)
                allPictures.appendChild(photo)
            }
            // console.log("JSON DATA\n", jsonData.data.children)
            jsonData.data.children.forEach(getPhoto)
            const redditImageGrab = (url) => {
                if()
                // return url.includes(".jpg") && url.startsWith("https://i.redd.it/") 
                // || url.includes(".png") && url.startsWith("https://i.redd.it/")
            }
            const filteredPhotos = photoArray.filter(redditImageGrab())
            
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
