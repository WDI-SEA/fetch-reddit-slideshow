let container = document.querySelector('#middle-container')
const form = document.querySelector('form')
let photos = []
let photosIndex = 0



// form.addEventListener('submit', event =>{
//     event.preventDefault()
//     fetch('https://www.reddit.com/search.json?q=cats+nsfw:no')
//     .then((response) => {
//         console.log('resolved', response);
//         return response.json();
//     }).catch((err) => {
//         console.log('rejected', err)

form.addEventListener('submit', event => {
    
    event.preventDefault()
    
  
    const searchBar = document.getElementById('search').value
        
    fetch(`http://www.reddit.com/search.json?q=${searchBar}+nsfw:no`)
    .then(res => res.json())
    .then(jsonData => {
         photos = jsonData.data.children.map(obj => {
            return{
                title: obj.data.title,
                url: obj.data.url,
                subreddit: obj.data.subreddit,
                posthint: obj.data.post_hint
            }
            }).filter(obj =>{
                return obj.posthint === 'image'
            })
            console.log(photos)
        })
      

       
    
    .catch(err => {
        console.log('ERROR', err)
       })   

       let image = document.querySelector('img')
       image = [];
       photos.forEach(function(photos){
           image.push(photos.url);
         
       })
       
        
       
})


