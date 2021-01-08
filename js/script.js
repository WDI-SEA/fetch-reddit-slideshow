
console.log("😎 Cool runnings🛷");


const form = document.getElementById('form');
const display = document.getElementById('display')
const stopBtn = document.getElementById('stop')
let slideshow = [];






//*********** reddit slideshow homework

// const redditPicEndPoint = 'https://www.reddit.com/search.json?q=kittens'

// fetch(redditPicEndPoint)
//         .then( function(fetchedPics) {
//             return fetchedPics.json();
//         })
//         .then(function(jsonPics) {
//             console.log('Pictures loaded');
            
//         })
//         .catch(function(err) {
//             console.log('Failed to fetch Pics!!', err)
//         })

//         console.log('Just fired AJAX Request');




// const addPictures = (pictures) =>{
//     // let peopleList = document.getElementById('peopleList');
//     let newPerson = document.createElement('li');
//     newPerson.textContent = `${person.name.first} ${person.name.last}`
//     peopleList.appendChild(newPerson) 
//     // append info in child we just created
// }
// document.addEventListener('DOMContentLoaded', ()=> {
//     form.addEventListener('submit', (event)=>{
//         event.preventDefault()
//         // stops all default functionality like page reloading when we submit a form
//         // while(peopleList.firstChild) {
//         //     peopleList.removeChild(peopleList.firstChild)
//         // }
        


//         fetch(redditPicEndPoint)
//         .then((fetchedPics)=>{
//             return fetchedPics.json()
//         })
//         .then((jsonPics)=>{
//             // jsonPics.results.forEach(addPerson)
//             jsonPics.results.forEach(addPictures)
            
//         })
//         .catch((err)=>{
//             console.log('Failed to fetch Pics!!', err)
//         })
        
//     })
// })