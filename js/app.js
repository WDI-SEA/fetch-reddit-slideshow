const container = document.querySelector('#middle-container')
const form = document.getElementById('form')
const catPicture = document.getElementById('kitty-container')
const submitButton = document.getElementById('input')
let results = 
    fetch('https://www.reddit.com/search.json?q=cats+nsfw:no').then((response) => {
        console.log('resolved', response);
        return response.json();
    }).catch((err) => {
        console.log('rejected', err)
    })
// submitButton.addEventListener('click', function(){

    
// form.addEventListener('submit', event =>{
//     event.preventDefault()
//     fetch('https://www.reddit.com/search.json?q=cats+nsfw:no')
//     .then((response) => {
//         console.log('resolved', response);
//         return response.json();
//     }).catch((err) => {
//         console.log('rejected', err)

//     })})

// .addEventListener('click', function(event){
//     event.preventDefault(search)
// }) //^^^^^^^^^^^^^^^^^//  attepting to prevent default
    
const onShowKittySucess = (kittyUrls)=>{
  
    
    kittyUrls = data.children.map(object => object.data.thumbnail) 
    console.log(kittyUrls)
}

// cat_image_urls = promise.map( object => object.)


// submitButton.addEventListener("click", () =>{
    
//     .then(res => res.json())
//     .catch(console.error)