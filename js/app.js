const requestUrl = "https://www.reddit.com/search.json?q="
// console.log('Script is running');


// test with forumla for capturing the URL, ammeding with search term, and returning captures amended URL
document.addEventListener('DOMContentLoaded', () => {
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        const search = requestUrl+input.value.replaceAll(" " ,  "+") + "+nsfw:no"
        
        fetch (search)
          .then((responseData)=>{
            return responseData.json()
          })
          .then((jsonData)=>{
            console.log("Here is the data:", jsonData);
            console.log(jsonData.data.children[2].data.url)
            console.log(search)
          })
          .catch((error) => {
            //if any error is sent back, you will have access to it here.
            console.log('ERROR!!!!')
            console.log(error)
        })
        
        console.log('Just fired AJAX request!');
    })
})


let blank = () => {
 input.value = " "
}

input.addEventListener("click", blank)

