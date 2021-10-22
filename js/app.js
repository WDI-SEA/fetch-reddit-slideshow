// console.log('Script is running');
//declare startingURL
const requestUrl = "https://www.reddit.com/search.json?q="


// test with function for capturing the URL, ammeding with search term, and returning captures amended URL
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        //ammend searchterm so url does not include space or nsfw images
        const search = requestUrl+input.value.replaceAll(" " ,  "+") + "+nsfw:no"
        
        fetch (search)
        .then((responseData)=>{
            return responseData.json()
        })
        .then((jsonData)=>{
            const switchImage = (imgSrc) => {
                imgSrc  = jsonData.data.children[Math.floor(Math.random () 
                    * +jsonData.data.children.length)].data.thumbnail  
                    image1.src = imgSrc 
            }
            switchImage() 
            let cycleImages = setInterval(switchImage, 5000) 


            const stopSlideshow = () => {
                clearInterval(cycleImages)
                stopButton.style.visibility = "hidden"
                form.style.display = "inherit"
                submitButton.style.display = "none" 
                title.style.display = "inherit"  
                imageContainer.style.visibility = "hidden" 
                image1.style.visibility = "hidden"    
                input.value = "Click here to search something..."

            }
            stopButton.addEventListener("click", stopSlideshow) 
        })
        .catch((error) => {
            //if any error is sent back, you will have access to it here.
            console.log('ERROR!!!!')
            console.log(error)
        })
        const hide = () => {
            form.style.display = "none"
            title.style.display = "none"
            imageContainer.style.visibility = "visible" 
            image1.style.visibility = "visible"    
            
        }
        hide()
        const showButton = () =>{
            stopButton.style.visibility = "visible"  }
            showButton()
        })
    })
    let blank = () => {
  input.value = "" 
  submitButton.style.display = "inherit" 
}
//function to test appending new image to div

input.addEventListener("click", blank)