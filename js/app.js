const requestUrl = "https://www.reddit.com/search.json?q="
console.log('Script is running');

document.addEventListener('DOMContentLoaded', () => {
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        
        fetch(requestUrl+ input.value) 
          .then((responseData)=>{
            console.log(requestUrl)
            return responseData.json()
          })
          .then((jsonData)=>{
            console.log("Here is the data:", jsonData);
          })
        
        console.log('Just fired AJAX request!');
    })
})
