//declare startingURL
const requestUrl = "https://www.reddit.com/search.json?q="
// console.log('Script is running');


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
            // console.log("Here is the data:", jsonData);
            console.log(jsonData)
            let imgSrc = jsonData.data.children[5].data.url
            const addImage = () => {
                // const img1 = document.createElement("img")
                image1.src = imgSrc
            
            
            }
            addImage()
            
            // console.log(search)

        })
        .catch((error) => {
            //if any error is sent back, you will have access to it here.
            console.log('ERROR!!!!')
            console.log(error)
        })
        
        // console.log('Just fired AJAX request!');
    })
})



let blank = () => {
    input.value = " "
}
//function to test appending new image to div

input.addEventListener("click", blank)